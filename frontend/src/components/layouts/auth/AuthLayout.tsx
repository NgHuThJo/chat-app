// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./AuthLayout.module.css";

export function AuthLayout({ children, ...restProps }: ComponentBaseProps) {
  return (
    <section className={styles.default} {...restProps}>
      {children}
    </section>
  );
}
