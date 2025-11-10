import { atom } from "jotai";
import { env } from "@/env";

export const languageAtom = atom<string>(env.NEXT_PUBLIC_DEFAULT_LOCALE);
