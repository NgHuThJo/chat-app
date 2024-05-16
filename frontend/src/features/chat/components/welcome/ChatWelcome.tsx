// Components
import { Image } from "@/components/ui/image/Image";
// Assets
import { welcomeSVG } from "@/assets";
// Styles
import styles from "./ChatWelcome.module.css";

export function ChatWelcome() {
  return (
    <section className={styles.default}>
      <Image src={welcomeSVG}></Image>
      <h2 className="text-center">Select a chat to start messaging</h2>
    </section>
  );
}
