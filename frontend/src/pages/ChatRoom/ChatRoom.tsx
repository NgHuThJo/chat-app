import { useState } from "react";
// Styles
import styles from "./ChatRoom.module.css";

function ChatRoom() {
  return (
    <div className={styles.room}>
      <input type="text" id="message" name="message" min="1" max="50" />
    </div>
  );
}

export default ChatRoom;
