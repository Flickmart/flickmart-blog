import { headers } from "next/headers";
import { Resend } from "resend";
import { client } from "@/lib/sanity";

// Verify webhook signature (optional but recommended)
function verifyWebhookSignature(
  body: any,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) {
    return false;
  }

  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(JSON.stringify(body));
  const digest = hmac.digest("hex");

  return digest === signature;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const signature = headersList.get("sanity-webhook-signature");

    // Verify webhook (set secret in Sanity)
    // const isValid = verifyWebhookSignature(body, signature, process.env.SANITY_WEBHOOK_SECRET!);
    // if (!isValid) {
    //   return Response.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Check if this is a post publish event
    if (body.operation === "create" || body.operation === "update") {
      const document = body.result;

      if (document._type === "post" && document.publishedAt) {
        // Check if post was just published (not just updated)
        const publishedAt = new Date(document.publishedAt).getTime();
        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;

        // Only send email if published within last hour
        if (publishedAt > oneHourAgo) {
          // Check if we already sent an email for this post
          const alreadySent = await client.fetch(
            `*[_type == "post" && _id == $postId && newsletterSent][0]`,
            { postId: document._id }
          );

          if (!alreadySent) {
            await sendNewPostEmail(document);

            // Mark as sent
            await client
              .patch(document._id)
              .set({
                newsletterSent: true,
                newsletterSentAt: new Date().toISOString(),
              })
              .commit();
          }
        }
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function sendNewPostEmail(post: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Fetch all confirmed subscribers
  const subscribers = await client.fetch(
    `*[_type == "subscriber" && confirmed == true][].email`
  );

  if (subscribers.length === 0) {
    console.log("No subscribers to email");
    return;
  }

  const postUrl = `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`;
  const excerpt = post.excerpt?.slice(0, 150) || "Read our latest blog post.";

  // Send batch email (up to 100 recipients at once)
  const batchSize = 100;
  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: batch,
      subject: `New Blog Post: ${post.title}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #FF6B00;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
              }
              .header { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
              .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2 class="header">${post.title}</h2>
              ${
                post.mainImage
                  ? `
                <img src="${post.mainImage.asset.url}" alt="${post.mainImage.alt}" style="max-width: 100%; border-radius: 8px; margin-bottom: 20px;">
              `
                  : ""
              }
              <p>${excerpt}</p>
              <br>
              <a href="${postUrl}" class="button">Read Full Post</a>
              <div class="footer">
                <p>You received this email because you subscribed to FlickMart blog updates.</p>
                <p>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe">Unsubscribe</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
  }

  console.log(`Sent new post email to ${subscribers.length} subscribers`);
}
