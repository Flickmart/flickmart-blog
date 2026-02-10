import { ExternalLink, Github, Linkedin, Mail, Twitter, X } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-background dark:bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        {/* Last Updated - Mobile Only */}
        <div className="mb-8 text-text-muted text-sm md:hidden">
          Last updated July 18, 2025 at 5:20 PM WAT
        </div>

        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {/* About Section - Desktop: spans 2 columns, Mobile: hidden */}
          <div className="hidden md:col-span-2 md:block">
            <h3 className="mb-4 font-futsat font-light text-foreground text-lg">
              Joseph Ebuka • Software Engineer
            </h3>
            <p className="mb-4 font-futsat text-text-muted text-sm leading-relaxed">
              A dedicated problem solver who thrives on learning and building.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 font-futsat">
              <Link
                aria-label="GitHub"
                className="text-text-muted transition-colors hover:text-foreground"
                href="https://github.com"
              >
                <Github size={20} />
              </Link>
              <Link
                aria-label="LinkedIn"
                className="text-text-muted transition-colors hover:text-foreground"
                href="https://linkedin.com"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                aria-label="Email"
                className="text-text-muted transition-colors hover:text-foreground"
                href="mailto:ebukaj665@gmail.com"
              >
                <Mail size={20} />
              </Link>
              <Link
                aria-label="X"
                className="text-text-muted transition-colors hover:text-foreground"
                href="https://x.com"
              >
                <X size={20} />
              </Link>
            </div>
          </div>

          {/* Me Section */}
          <div>
            <h4 className="mb-3 font-medium text-foreground text-sm md:mb-4 md:text-base">
              Me
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-text-muted transition-colors hover:text-foreground"
                  href="/projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-muted transition-colors hover:text-foreground"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-muted transition-colors hover:text-foreground"
                  href="/bookmarks"
                >
                  Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* This Site Section */}
          <div>
            <h4 className="mb-3 font-medium text-foreground text-sm md:mb-4 md:text-base">
              This site
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-text-muted transition-colors hover:text-foreground"
                  href="/analytics"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-muted transition-colors hover:text-foreground"
                  href="/rss"
                >
                  RSS
                </Link>
              </li>
              <li>
                <Link
                  className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-[#A1A1AA] dark:hover:text-white"
                  href="https://github.com/Joseph-Ebuka"
                >
                  Source code
                  <ExternalLink size={12} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Elsewhere Section - Mobile Only, Full Width */}
        <div className="mb-8 md:hidden">
          <h4 className="mb-3 font-medium text-gray-900 text-sm dark:text-white">
            Elsewhere
          </h4>
          <ul className="space-y-2 font-light text-sm">
            <li>
              <Link
                className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-[#A1A1AA] dark:hover:text-white"
                href="https://bluesky.app"
              >
                Bluesky
                <ExternalLink size={12} />
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-[#A1A1AA] dark:hover:text-white"
                href="https://monkeytype.com"
              >
                Monkeytype
                <ExternalLink size={12} />
              </Link>
            </li>
          </ul>
        </div>

        {/* About Section - Mobile Only */}
        <div className="mb-6 md:hidden">
          <h3 className="mb-3 font-futsat font-light text-foreground text-lg">
            Joseph Ebuka • Software Engineer
          </h3>
          <p className="mb-4 font-futsat text-text-muted text-sm leading-relaxed">
            A dedicated problem solver who thrives on learning and building.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              aria-label="GitHub"
              className="text-text-muted transition-colors hover:text-foreground"
              href="https://github.com"
            >
              <Github size={20} />
            </Link>
            <Link
              aria-label="LinkedIn"
              className="text-text-muted transition-colors hover:text-foreground"
              href="https://linkedin.com"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              aria-label="Email"
              className="text-text-muted transition-colors hover:text-foreground"
              href="mailto:contact@example.com"
            >
              <Mail size={20} />
            </Link>
            <Link
              aria-label="Twitter"
              className="text-text-muted transition-colors hover:text-foreground"
              href="https://twitter.com"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>

        <div className="hidden items-center justify-between border-t pt-8 text-text-muted text-sm md:flex">
          <div className="mb-4 md:mb-0">
            © 2025 Joseph Ebuka. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Last updated on July 18, 2025 at 5:20 PM WAT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
