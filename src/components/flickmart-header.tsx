"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                alt="FlickMart Logo"
                className="font-bold text-lg text-white"
                height={60}
                src="/Logo.svg"
                width={60}
              />
            </div>
            <span
              className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Flick<span className="text-[#FF6B00]">Mart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              className={`font-medium text-sm transition-colors hover:text-[#FF6B00] ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className={`font-medium text-sm transition-colors hover:text-[#FF6B00] ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
              href="#"
            >
              Projects
            </Link>
            <Link
              className={`font-medium text-sm transition-colors hover:text-[#FF6B00] ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
              href="#"
            >
              About
            </Link>
            <Link
              className={`font-medium text-sm transition-colors hover:text-[#FF6B00] ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
              href="#"
            >
              Newsletter
            </Link>
            <Link
              className="inline-flex items-center rounded-md bg-[#FF6B00] px-5 py-4 font-medium text-sm text-white transition-colors hover:bg-[#e65c00]"
              href="https://flickmart.app/"
            >
              Visit Flickmart
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-inset md:hidden ${
                  isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                type="button"
              >
                <span className="sr-only">Open main menu</span>
                <Menu aria-hidden="true" className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              className={isDark ? "h-full bg-gray-900" : "h-full bg-white"}
              side="top"
            >
              <SheetHeader>
                <SheetTitle className={isDark ? "text-white" : "text-gray-900"}>
                  <Link className="flex items-center gap-2" href="/">
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Image
                        alt="FlickMart Logo"
                        className="font-bold text-lg text-white"
                        height={60}
                        src="/Logo.svg"
                        width={60}
                      />
                    </div>
                    <span
                      className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Flick<span className="text-[#FF6B00]">Mart</span>
                    </span>
                  </Link>{" "}
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-3/4 flex-col justify-between">
                <div className="mt-8 space-y-2 *:rounded-none *:border-b *:border-b-neutral-700">
                  <Link
                    className={`block rounded-lg px-1 py-3 font-medium text-base transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    href="/blog"
                  >
                    Blog
                  </Link>
                  <Link
                    className={`block rounded-lg px-1 py-3 font-medium text-base transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    href="#"
                  >
                    Projects
                  </Link>
                  <Link
                    className={`block rounded-lg px-1 py-3 font-medium text-base transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    href="#"
                  >
                    About
                  </Link>
                  <Link
                    className={`block rounded-lg px-1 py-3 font-medium text-base transition-colors hover:bg-orange-500/10 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    href="#"
                  >
                    Newsletter
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    className="mt-4 block rounded-lg bg-[#FF6B00] px-4 py-3 text-center font-medium text-base text-white transition-colors hover:bg-[#e65c00]"
                    href="https://flickmart.app/"
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
