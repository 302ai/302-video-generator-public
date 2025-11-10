import { useAtomValue } from "jotai";
import { appConfigAtom } from "@/stores";

export function useIsHideBrand() {
  const config = useAtomValue(appConfigAtom);
  return config.hideBrand;
}
