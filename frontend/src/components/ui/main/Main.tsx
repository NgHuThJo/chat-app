import { resolveClassName } from "@/utils/className";
import { ComponentBaseProps } from "@/types";
import styles from "./Main.module.css";

export function Main({
  children,
  className,
  ...restProps
}: ComponentBaseProps) {
  return (
    <main className={resolveClassName(className, styles)} {...restProps}>
      {children}
    </main>
  );
}
