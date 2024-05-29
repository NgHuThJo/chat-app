import { GenericObject } from "@/types";
import styles from "./ChatLayout.module.css";

export function ChatLayout({ children }: GenericObject) {
  return <section className={styles.default}>{children}</section>;
}
