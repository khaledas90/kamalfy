import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import Providers from "./providers";
import { Toaster } from "sonner";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Boostify | AI-Powered eCommerce Platform for Smarter Selling",
  description:
    "Sell smarter, grow faster with Boostify. AI-driven eCommerce platform with automation, analytics, and AI sales advisors to boost your online store sales.",
  keywords: "eCommerce, AI, automation, sales, analytics, merchants, online store, sales platform",
  authors: [{ name: "Boostify" }],
  creator: "Boostify",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boostify.app",
    title: "Boostify | AI-Powered eCommerce Platform",
    description: "Sell smarter, grow faster with AI automation and analytics",
    siteName: "Boostify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boostify | AI-Powered eCommerce Platform",
    description: "Sell smarter, grow faster with AI automation and analytics",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale }).catch(() => ({}));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${_geist.variable} ${_geistMono.variable}`}
        suppressHydrationWarning
      >
        <body className="antialiased">
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              forcedTheme="light"
              disableTransitionOnChange
            >
              <Toaster richColors position="top-right" />
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
