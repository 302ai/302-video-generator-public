import { atom } from "jotai";
import { isMobile } from "@/utils";

export const chatVisibleAtom = atom<boolean>(!isMobile());
