"use client";

import { Provider as JotaiProvider } from "jotai";
import { useLocale } from "next-intl";
import { languageAtom, store } from "@/stores";

export default function AppJotai({ children }: { children: React.ReactNode }) {
  // Set the initial locale to the pathname locale
  const locale = useLocale();
  store.set(languageAtom, locale);
  return <JotaiProvider store={store}>{children}</JotaiProvider>;
}
