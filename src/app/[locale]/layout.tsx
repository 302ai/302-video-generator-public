import AppChat from "@/components/global/app-chat";
import { AppClickMonitor } from "@/components/global/app-click-monitor";
import AppClient from "@/components/global/app-client";
import AppFooter from "@/components/global/app-footer";
import AppHeader from "@/components/global/app-header";
import AppJotai from "@/components/global/app-jotai";
import AppMessage from "@/components/global/app-message";
import AppTheme from "@/components/global/app-theme";
import AppTooltip from "@/components/global/app-tooltip";
import { GLOBAL, SEO_DATA } from "@/constants";
import { env } from "@/env";

import "@/styles/globals.css";

import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next/types";
import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import AppQeury from "@/components/global/app-query";
import { getServerTheme } from "@/utils/theme";

// SEO metadata
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const hostname = (await headers()).get("host") ?? "";
  const previousImages = (await parent).openGraph?.images ?? [];

  // Get SEO data for the current language, using optional chaining and nullish coalescing
  const currentSeo = SEO_DATA.languages?.[locale] ?? {
    title: "302 AI TOOL",
    description: "This is a tool for 302 AI",
    image: "/default-image.jpg",
  };

  const images = [currentSeo.image, ...previousImages].filter(Boolean);
  const baseUrl = `https://${hostname}`;

  // Generate URL mapping for other language versions
  const languageAlternates = GLOBAL.LOCALE.SUPPORTED.reduce<
    Record<string, string>
  >((acc, lang) => {
    if (lang !== locale) {
      acc[lang] = `/${lang}`;
    }
    return acc;
  }, {});

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      url: `/${locale}`,
      images,
    },
    twitter: {
      site: `${baseUrl}/${locale}`,
      images,
    },
  };
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;
  // Ensure theme is set on server side, to avoid hydration error
  const theme = await getServerTheme(cookies);

  if (
    !GLOBAL.LOCALE.SUPPORTED.includes(
      locale as (typeof GLOBAL.LOCALE.SUPPORTED)[number]
    )
  ) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={theme} style={{ colorScheme: theme }}>
      <head>
        {/* Performance Analysis Tool */}
        {env.NODE_ENV === "development" && (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          ></script>
        )}
      </head>
      <body className="flex h-screen flex-col overflow-hidden antialiased">
        {/* Force theme to be set on client side, to avoid hydration error on first render */}
        <AppTheme theme={theme}>
          <AppQeury>
            <NextIntlClientProvider messages={messages}>
              <AppJotai>
                <AppClient>
                  <AppTooltip>
                    <AppHeader />
                    {children}
                    <AppFooter />
                  </AppTooltip>
                  {/* <AppAuth /> */}
                  <AppChat />
                  <AppClickMonitor />
                </AppClient>
                <AppMessage />
              </AppJotai>
            </NextIntlClientProvider>
          </AppQeury>
        </AppTheme>
      </body>
    </html>
  );
}
