import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { GLOBAL } from "@/constants/values";

export const routing = defineRouting({
  locales: GLOBAL.LOCALE.SUPPORTED,
  defaultLocale: GLOBAL.LOCALE.DEFAULT,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
