import { GeneralObject } from "@/types";
import styles from "./ChatLayout.module.css";

export function ChatLayout({ children }: GeneralObject) {
  return <section className={styles.default}>{children}</section>;
}
