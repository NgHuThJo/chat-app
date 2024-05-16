// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./List.module.css";

export function List({
  children,
  className,
  ...restProps
}: ComponentBaseProps) {
  return (
    <ul className={styles[className]} {...restProps}>
      {children}
    </ul>
  );
}
