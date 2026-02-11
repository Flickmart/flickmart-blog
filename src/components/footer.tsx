import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Main Footer Content - 3 Column Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Zone - Branding */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FF6600]">
                <span className="font-bold font-switzer-bold text-white text-xl">
                  F
                </span>
              </div>
              <span className="font-bold font-switzer-bold text-xl">
                FlickMart
              </span>
            </div>

            {/* Tagline */}
            <p className="font-switzer-regular text-gray-300 text-sm">
              One flick endless choices
            </p>
          </div>

          {/* Middle Zone - Navigation + Contact */}
          <div className="flex flex-col justify-between">
            {/* Navigation Menu */}
            <ul className="mb-6 space-y-2">
              <li>
                <Link
                  className="font-switzer-regular text-sm text-white transition-colors hover:text-[#FF6600]"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="font-switzer-regular text-sm text-white transition-colors hover:text-[#FF6600]"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="font-switzer-regular text-sm text-white transition-colors hover:text-[#FF6600]"
                  href="/newsroom"
                >
                  News room
                </Link>
              </li>
              <li>
                <Link
                  className="font-switzer-regular text-sm text-white transition-colors hover:text-[#FF6600]"
                  href="/blog"
                >
                  Blogs
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div>
              <span className="font-semibold font-switzer-bold text-sm">
                Email :
              </span>{" "}
              <span className="font-switzer-regular text-sm text-white">
                flickmart#12@gmail.com
              </span>
            </div>
          </div>

          {/* Right Zone - Newsletter */}
          <div>
            <h4 className="mb-1 font-semibold font-switzer-bold text-base">
              subscribe to our newsletter
            </h4>
            <p className="mb-1 font-switzer-regular text-sm text-white">
              Don't get left in the dust
            </p>
            <p className="mb-4 font-switzer-regular text-gray-300 text-sm">
              Fresh features, secret sales, and news you actually want delivered
              in a flick.
            </p>

            {/* Newsletter Form */}
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                aria-label="Email address"
                className="flex-1 rounded px-4 py-2 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                placeholder="Email address"
                type="email"
              />
              <button
                className="rounded bg-[#FF6600] px-6 py-2 font-semibold font-switzer-bold text-sm text-white transition-colors hover:bg-[#e65c00] focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:ring-offset-2 focus:ring-offset-black"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="my-8 border-gray-800 border-t" />

        {/* Bottom Sub-Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="font-switzer-regular text-gray-400 text-sm">
            Copyright © 2025 FlickMart All rights reserved
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00]"
              href="https://instagram.com"
            >
              <Instagram size={16} />
            </a>
            <a
              aria-label="YouTube"
              className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00]"
              href="https://youtube.com"
            >
              <Youtube size={16} />
            </a>
            <a
              aria-label="X"
              className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00]"
              href="https://x.com"
            >
              <svg
                fill="currentColor"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00]"
              href="https://facebook.com"
            >
              <Facebook size={16} />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4">
            <Link
              className="font-switzer-regular text-gray-400 text-sm transition-colors hover:text-white"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="font-switzer-regular text-gray-400 text-sm transition-colors hover:text-white"
              href="/terms"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
