// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Image.module.css";

interface ImageProps extends ComponentBaseProps {
  src: string;
  alt?: string;
}

function Image({ src, alt, className, ...restProps }: ImageProps) {
  return (
    <img
      className={styles[className!]}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...restProps}
    />
  );
}

export default Image;
