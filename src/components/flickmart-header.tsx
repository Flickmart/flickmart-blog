"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FlickMartHeader() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 ${
        isDark ? "border-gray-800" : "border-gray-200"
      } ${isDark ? "bg-gray-900/95" : "bg-white/95"}`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:py-6 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center ">
              <Image
                src="/Logo.svg"
                alt="FlickMart Logo"
                className="text-lg font-bold text-white"
                width={60}
                height={60}
              />
            </div>
            <span
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Flick<span className="text-[#FF6B00]">Mart</span>
            </span>
          </Link>

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
              className={`text-sm font-medium transition-colors hover:text-[#FF6B00] ${
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
              href="https://flickmart.app/"
              className="inline-flex items-center rounded-md bg-[#FF6B00] px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#e65c00]"
            >
              Visit Flickmart
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF6B00] md:hidden ${
                  isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className={isDark ? "bg-gray-900 h-full" : "bg-white h-full"}
            >
              <SheetHeader>
                <SheetTitle className={isDark ? "text-white" : "text-gray-900"}>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center ">
                      <Image
                        src="/Logo.svg"
                        alt="FlickMart Logo"
                        className="text-lg font-bold text-white"
                        width={60}
                        height={60}
                      />
                    </div>
                    <span
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Flick<span className="text-[#FF6B00]">Mart</span>
                    </span>
                  </Link>{" "}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-between h-3/4">
                <div className="mt-8 space-y-2 *:border-b *:border-b-neutral-700 *:rounded-none">
                  <Link
                    href="/blog"
                    className={`block rounded-lg px-1 py-3 text-base font-medium transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className={`block rounded-lg px-1 py-3 text-base font-medium transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    href="#"
                    className={`block rounded-lg px-1 py-3 text-base font-medium transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className={`block rounded-lg px-1 py-3 text-base font-medium transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Newsletter
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="https://flickmart.app/"
                    className="mt-4 block rounded-lg bg-[#FF6B00]  px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#e65c00]"
                  >
                    Visit Flickmart
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
