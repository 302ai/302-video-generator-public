import { getCookie } from "cookies-next";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { EMPTY_THEME, THEME_COOKIE_NAME } from "@/constants";

export const getServerTheme = async (
  cookies: () => Promise<ReadonlyRequestCookies>
): Promise<string> => {
  const cookieStore = await cookies();
  const theme = getCookie(THEME_COOKIE_NAME, {
    cookies: () => Promise.resolve(cookieStore),
  });
  return (theme as string) || EMPTY_THEME;
};
