"use client";

import { useEffect, useState } from "react";

const POPUP_DELAY_MS = 30_000; // 30 seconds
const STORAGE_KEY = "newsletter-popup-dismissed";

export function useNewsletterPopup(delay: number = POPUP_DELAY_MS) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed
    const wasDismissed = localStorage.getItem(STORAGE_KEY);
    if (wasDismissed) {
      return;
    }

    // Set timer
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const dismissPopup = (permanent = false) => {
    setShowPopup(false);
    if (permanent) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  return { showPopup, dismissPopup };
}
