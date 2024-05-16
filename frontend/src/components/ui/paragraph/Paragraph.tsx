// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./Paragraph.module.css";

export function Paragraph({
  children,
  className,
  ...restProps
}: GeneralObject) {
  return (
    <p className={styles[className]} {...restProps}>
      {children}
    </p>
  );
}
