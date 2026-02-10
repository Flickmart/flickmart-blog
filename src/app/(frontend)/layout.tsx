import type { Metadata, Viewport } from "next";
import { DM_Mono, Fira_Code, Fustat, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AppDock } from "@/components/ui/floating-dock";
import { TOCProvider } from "@/contexts/toc-context";

// Configure Switzer font variants
const switzer = localFont({
  src: [
    {
      path: "../../../public/fonts/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Switzer-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-switzer-bold",
  display: "swap",
});

const switzerRegular = localFont({
  src: [
    {
      path: "../../../public/fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Switzer-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-switzer-regular",
  display: "swap",
});

const futsat = Fustat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fustat",
});

const dm = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-code",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-code",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Joseph Ebuka",
  description: "Software Engineer from Nigeria",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          data-website-id="78afeedb-5ea2-4193-9365-060a5b0c73e0"
          defer
          src="https://cloud.umami.is/script.js"
        />
      </head>
      <body
        className={`${switzer.variable} ${switzerRegular.variable} ${firaCode.variable} ${jetBrainsMono.variable} ${dm.variable} ${futsat.variable} bg-background font-sans antialiased selection:bg-brand-accent selection:text-white dark:bg-background`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
          storageKey="portfolio-theme"
        >
          <TOCProvider>
            {children}
            <Footer />
            <AppDock />
            <Toaster position="top-right" />
          </TOCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
