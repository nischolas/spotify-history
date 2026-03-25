import { track, identify } from "@nischolas/vite-plugin-umami-inline";

export function useUmami() {
  return { track, identify };
}
