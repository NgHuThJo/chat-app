// Types
import { GenericObject } from "@/types";
// Styles
import styles from "./Paragraph.module.css";

export function Paragraph({
  children,
  className,
  ...restProps
}: GenericObject) {
  return (
    <p className={styles[className]} {...restProps}>
      {children}
    </p>
  );
}
