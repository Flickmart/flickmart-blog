import { redirect } from "next/navigation";
import { client } from "@/lib/sanity";

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  // Handle unsubscribe immediately (server action)
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <UnsubscribeHandler token={searchParams.token} />
    </div>
  );
}

async function UnsubscribeHandler({ token }: { token?: string }) {
  if (!token) {
    return (
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <h1 className="mb-4 font-switzer-bold text-2xl">
          Invalid Unsubscribe Link
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This unsubscribe link is invalid. Please check your email.
        </p>
      </div>
    );
  }

  const subscriber = await client.fetch(
    `*[_type == "subscriber" && unsubscribeToken == $token][0]`,
    { token }
  );

  if (!subscriber) {
    return (
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <h1 className="mb-4 font-switzer-bold text-2xl">
          Invalid Unsubscribe Link
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This unsubscribe link is invalid or has expired.
        </p>
      </div>
    );
  }

  // Update subscriber to remove confirmation
  await client.patch(subscriber._id).set({ confirmed: false }).commit();

  redirect("/?unsubscribed=true");
}
