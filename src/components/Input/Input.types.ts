import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showClear?: boolean;
  onClear?: () => void;
};
