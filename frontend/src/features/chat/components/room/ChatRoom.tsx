// Third party
import { useEffect, useState } from "react";
// API
import { getChatMessages } from "../../api/chat";
// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./ChatRoom.module.css";

type ChatRoom = {
  currentChat: GeneralObject;
  currentUser: GeneralObject;
  socket: React.MutableRefObject<WebSocket>;
};

export function ChatRoom({ currentChat, currentUser, socket }: ChatRoom) {
  const [chatMessages, setChatMessages] = useState<GeneralObject>();

  useEffect(() => {
    const getAllChatRoomMessages = async () => {
      const response = await getChatMessages(currentChat._id);

      console.log(response);

      setChatMessages(response);
    };

    getAllChatRoomMessages();
  }, []);

  return (
    <section className={styles.default}>
      <div>Hello world!</div>
      <input type="text" id="message" name="message" min="1" max="50" />
    </section>
  );
}
