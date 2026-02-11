"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Flame } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function FlickMartHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full  backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 ${
        isDark ? "border-gray-800" : "border-gray-200"
      } ${isDark ? "bg-gray-900/95" : "bg-white/95"}`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:py-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center ">
              <Image
                src="/logo.png"
                alt="FlickMart Logo"
                width={80}
                height={80}
              />
            </div>
            <span
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Flick<span className="text-[#FF6B00]">Mart</span>
            </span>
          </Link>

          <div className="hidden md:flex gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors hover:text-[#FF6B00] ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Blog
              </Link>
              <Link
                href="#"
                className={`text-sm transition-colors font-medium  hover:text-[#FF6B00] ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Projects
              </Link>

              <Link
                href="#"
                className={`text-sm font-medium transition-colors hover:text-[#FF6B00] ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                About
              </Link>
              <Link
                href="#"
                className={`text-sm font-medium transition-colors hover:text-[#FF6B00] ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Newsletter
              </Link>

              <Link
                href="#"
                className="inline-flex items-center rounded-md bg-[#FF6B00] px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#e65c00]"
              >
                Visit Flickmart
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF6B00] md:hidden ${
              isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
          <div
            className={`space-y-1 px-4 pb-3 pt-2 ${isDark ? "border-gray-800" : "border-gray-200"} border-t`}
          >
            <Link
              href="/blog"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-[#FF6B00] ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-[#FF6B00] ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-[#FF6B00] ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-[#FF6B00] ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletter
            </Link>
            <Link
              href="#"
              className="mt-2 block rounded-md bg-[#FF6B00] px-3 py-2 text-center text-base font-medium text-white transition-colors hover:bg-[#e65c00]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Visit Flickmart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
