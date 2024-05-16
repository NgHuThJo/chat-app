// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./Image.module.css";

interface ImageProps extends ComponentBaseProps {
  src: string;
  alt?: string;
}

export function Image({ src, alt, className, ...restProps }: ImageProps) {
  return (
    <img
      className={resolveClassName(className, styles)}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...restProps}
    />
  );
}
