"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!(email && /^\S+@\S+\.\S+$/.test(email))) {
      toast.error("Please enter a valid email address");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);

      const result = await subscribeToNewsletter(null, formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        setIsSuccess(true);
        toast.success(result.message || "Successfully subscribed!");
        setEmail("");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        <p className="font-medium text-sm">Successfully Subscribed!</p>
        <p className="text-sm">Thank you for subscribing to our newsletter!</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
      <input
        aria-label="Email address"
        className="flex-1 rounded px-4 py-2 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
        disabled={isPending}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        type="email"
        value={email}
      />
      <Button
        className="rounded bg-[#FF6600] px-6 py-2 font-semibold font-switzer-bold text-sm text-white transition-colors hover:bg-[#e65c00] focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2 focus:ring-offset-black"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
