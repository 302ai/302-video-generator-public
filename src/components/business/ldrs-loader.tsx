import { DotPulse, LineSpinner, Ring, Waveform } from "ldrs/react";

import "ldrs/react/DotPulse.css";
import "ldrs/react/LineSpinner.css";
import "ldrs/react/Ring.css";
import "ldrs/react/Waveform.css";

import { match } from "ts-pattern";

interface LdrsLoaderProps {
  type: "dot-pulse" | "line-spinner" | "waveform" | "ring";
  size?: number;
  speed?: number;
  color?: string;
  stroke?: number;
}

export function LdrsLoader({
  type,
  size = 20,
  speed = 1,
  stroke = 2,
  color = "currentColor",
}: LdrsLoaderProps) {
  return match(type)
    .with("dot-pulse", () => (
      <DotPulse size={size} speed={speed} color={color} />
    ))
    .with("line-spinner", () => (
      <LineSpinner size={size} speed={speed} color={color} stroke={stroke} />
    ))
    .with("waveform", () => (
      <Waveform size={size} speed={speed} color={color} />
    ))
    .with("ring", () => (
      <Ring size={size} speed={speed} color={color} stroke={stroke} />
    ))
    .exhaustive();
}
