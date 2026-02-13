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
    console.log("🔔 Sanity Webhook received");

    const body = await request.json();
    console.log("📦 Webhook payload:", JSON.stringify(body, null, 2));

    const headersList = headers();
    const signature = headersList.get("sanity-webhook-signature");
    console.log("🔐 Webhook signature:", signature);

    // Verify webhook (set secret in Sanity)
    // const isValid = verifyWebhookSignature(body, signature, process.env.SANITY_WEBHOOK_SECRET!);
    // if (!isValid) {
    //   console.log("❌ Invalid webhook signature");
    //   return Response.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Check if this is a post publish event
    console.log("🔍 Operation:", body.operation);

    if (body.operation === "create" || body.operation === "update") {
      const document = body.result;
      console.log("📄 Document type:", document._type);
      console.log("📄 Document ID:", document._id);

      if (document._type === "post") {
        console.log("✅ This is a blog post");

        if (document.publishedAt) {
          console.log("📅 Published at:", document.publishedAt);

          // Check if post was just published (not just updated)
          const publishedAt = new Date(document.publishedAt).getTime();
          const now = Date.now();
          const oneHourAgo = now - 60 * 60 * 1000;

          console.log("⏰ Time check:");
          console.log("  - Published:", new Date(publishedAt).toISOString());
          console.log("  - One hour ago:", new Date(oneHourAgo).toISOString());
          console.log("  - Should send:", publishedAt > oneHourAgo);

          // Only send email if published within last hour
          if (publishedAt > oneHourAgo) {
            console.log(
              "🚀 Post published within last hour - checking if email sent..."
            );

            // Check if we already sent an email for this post
            const alreadySent = await client.fetch(
              `*[_type == "post" && _id == $postId && newsletterSent][0]`,
              { postId: document._id }
            );

            console.log(
              "📧 Already sent?",
              alreadySent ? "YES - Skipping" : "NO - Sending email"
            );

            if (alreadySent) {
              console.log("⏭️ Skipping - already sent");
            } else {
              console.log(
                "📧 Sending newsletter email for post:",
                document.title
              );
              await sendNewPostEmail(document);

              // Mark as sent
              console.log("✅ Marking post as newsletter sent");
              await client
                .patch(document._id)
                .set({
                  newsletterSent: true,
                  newsletterSentAt: new Date().toISOString(),
                })
                .commit();

              console.log("✅ Newsletter email sent successfully");
            }
          } else {
            console.log("⏰ Post published more than 1 hour ago - skipping");
          }
        } else {
          console.log("📝 Post not published yet");
        }
      } else {
        console.log("❌ Not a blog post - ignoring");
      }
    } else {
      console.log("❌ Not create/update operation - ignoring");
    }

    console.log("✅ Webhook processed successfully");
    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    console.error(
      "❌ Error message:",
      error instanceof Error ? error.message : "Unknown"
    );
    console.error(
      "❌ Error stack:",
      error instanceof Error ? error.stack : "Unknown"
    );
    console.error("❌ Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      cause: error instanceof Error ? error.cause : "Unknown",
      toString: error instanceof Error ? error.toString() : "Unknown",
    });

    return Response.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

if (document.publishedAt) {
  console.log("📅 Published at:", document.publishedAt);

  // Check if post was just published (not just updated)
  const publishedAt = new Date(document.publishedAt).getTime();
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  console.log("⏰ Time check:");
  console.log("  - Published:", new Date(publishedAt).toISOString());
  console.log("  - One hour ago:", new Date(oneHourAgo).toISOString());
  console.log("  - Should send:", publishedAt > oneHourAgo);

  // Only send email if published within last hour
  if (publishedAt > oneHourAgo) {
    console.log(
      "🚀 Post published within last hour - checking if email sent..."
    );

    // Check if we already sent an email for this post
    const alreadySent = await client.fetch(
      `*[_type == "post" && _id == $postId && newsletterSent][0]`,
      { postId: document._id }
    );

    console.log(
      "📧 Already sent?",
      alreadySent ? "YES - Skipping" : "NO - Sending email"
    );

    if (alreadySent) {
      console.log("⏭️ Skipping - already sent");
    } else {
      console.log("📧 Sending newsletter email for post:", document.title);
      await sendNewPostEmail(document);

      // Mark as sent
      console.log("✅ Marking post as newsletter sent");
      await client
        .patch(document._id)
        .set({
          newsletterSent: true,
          newsletterSentAt: new Date().toISOString(),
        })
        .commit();

      console.log("✅ Newsletter email sent successfully");
    }
  } else {
    console.log("⏰ Post published more than 1 hour ago - skipping");
  }
} else {
  console.log("📝 Post not published yet");
}
} else
{
  console.log("❌ Not a blog post - ignoring");
}
} else
{
  console.log("❌ Not create/update operation - ignoring");
}

console.log("✅ Webhook processed successfully");
return Response.json({ success: true });
} catch (error)
{
  console.error("❌ Webhook error:", error);
  console.error(
    "❌ Error stack:",
    error instanceof Error ? error.stack : "Unknown"
  );
  return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
}
}

async
function sendNewPostEmail(post: any) {
  console.log("📧 sendNewPostEmail called");
  console.log("📧 Post title:", post.title);
  console.log("📧 Post slug:", post.slug?.current);

  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("📧 Resend client created");
  console.log("📧 RESEND_API_KEY exists?", !!process.env.RESEND_API_KEY);
  console.log("📧 RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL);
  console.log("📧 NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);

  // Fetch all confirmed subscribers
  console.log("👥 Fetching confirmed subscribers...");
  const subscribers = await client.fetch(
    `*[_type == "subscriber" && confirmed == true][].email`
  );

  console.log(`👥 Found ${subscribers.length} confirmed subscribers`);

  if (subscribers.length === 0) {
    console.log("⚠️ No subscribers to email");
    return;
  }

  const postUrl = `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`;
  const excerpt = post.excerpt?.slice(0, 150) || "Read our latest blog post.";

  console.log("📧 Post URL:", postUrl);
  console.log("📧 Excerpt:", excerpt);
  console.log("📧 Has image:", !!post.mainImage);

  // Send batch email (up to 100 recipients at once)
  const batchSize = 100;
  const batches = Math.ceil(subscribers.length / batchSize);
  console.log(`📧 Sending ${batches} batches of emails...`);

  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    console.log(
      `📧 Sending batch ${batchNumber}/${batches} (${batch.length} subscribers)...`
    );

    try {
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

      console.log(`✅ Batch ${batchNumber}/${batches} sent successfully`);
    } catch (error) {
      console.error(`❌ Error sending batch ${batchNumber}:`, error);
    }
  }

  console.log(`✅ Sent new post email to ${subscribers.length} subscribers`);
}
