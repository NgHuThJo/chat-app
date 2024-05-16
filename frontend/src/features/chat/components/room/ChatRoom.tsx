import styles from "./ChatRoom.module.css";

export function ChatRoom() {
  return (
    <section className={styles.default}>
      <div></div>
      <input type="text" id="message" name="message" min="1" max="50" />
    </section>
  );
}
