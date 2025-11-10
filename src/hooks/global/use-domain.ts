"use client";

import { useAtomValue } from "jotai";
import { env } from "@/env";
import { appConfigAtom } from "@/stores/slices/config_store";

export function useDomain() {
  const isChina = useAtomValue(appConfigAtom).isChina;

  const domain = isChina
    ? env.NEXT_PUBLIC_302_WEBSITE_URL_CHINA
    : env.NEXT_PUBLIC_302_WEBSITE_URL_GLOBAL;
  return domain;
}
