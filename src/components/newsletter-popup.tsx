"use client";

import { NewsletterForm } from "@/components/newsletter-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewsletterPopup } from "@/hooks/use-newsletter-popup";

export function NewsletterPopup() {
  const { showPopup, dismissPopup } = useNewsletterPopup(30_000); // 30 seconds

  if (!showPopup) {
    return null;
  }

  return (
    <Dialog
      onOpenChange={(open) => !open && dismissPopup(false)}
      open={showPopup}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stay in the Loop</DialogTitle>
          <DialogDescription>
            Get the latest FlickMart blog posts delivered straight to your
            inbox. Join our community of readers today!
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <NewsletterForm />
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <button
            className="underline hover:text-foreground"
            onClick={() => dismissPopup(true)}
          >
            Don&apos;t show this again
          </button>
          <span>We respect your privacy</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
