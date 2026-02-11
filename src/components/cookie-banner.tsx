"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 border-t px-4 py-4 shadow-lg sm:px-6 ${
        isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Cookie Text */}
          <div
            className={`flex-1 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We use cookies to improve your experience. By continuing to visit
            this site you agree to our use of cookies.{" "}
            <button
              className="text-[#FF6B00] underline hover:no-underline"
              onClick={() => setShowSettings(!showSettings)}
            >
              settings
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              className={`rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
                isDark
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={handleDecline}
            >
              Do not allow cookies
            </button>
            <button
              className="rounded-full bg-[#FF6B00] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#e65c00]"
              onClick={handleAccept}
            >
              Allow all cookies
            </button>
            <button
              aria-label="Close"
              className={`ml-2 transition-colors ${
                isDark
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => setIsVisible(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className={`mt-4 border-t pt-4 ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <p
              className={`mb-3 font-medium text-sm ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Cookie Preferences
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00] dark:border-gray-700"
                  defaultChecked
                  type="checkbox"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Essential cookies
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00] dark:border-gray-700"
                  defaultChecked
                  type="checkbox"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Analytics cookies
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00] dark:border-gray-700"
                  type="checkbox"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Marketing cookies
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
