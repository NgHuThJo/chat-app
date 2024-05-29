// Third party
import { useEffect, useState } from "react";
// Components
import { Form } from "@/components/ui/form";
// API
import { createChatMessage, getChatMessages } from "../../api/chat";
// Types
import { GenericObject } from "@/types";
// Styles
import styles from "./ChatRoom.module.css";
import { i } from "vitest/dist/reporters-MmQN-57K.js";

type ChatRoom = {
  currentChat: GenericObject;
  currentUser: GenericObject;
  pingSocketReducer: GenericObject;
  pongSocketReducer: GenericObject;
  socket: React.MutableRefObject<WebSocket>;
};

const inputFields = [
  {
    type: "text",
    id: "message",
    name: "message",
    placeholder: "Your message...",
    min: 1,
  },
];

export function ChatRoom({
  currentChat,
  currentUser,
  pingSocketReducer,
  pongSocketReducer,
  socket,
}: ChatRoom) {
  const [chatMessages, setChatMessages] = useState<GenericObject[]>([]);

  useEffect(() => {
    const getAllChatRoomMessages = async () => {
      const response = await getChatMessages(currentChat._id);

      setChatMessages(response);
    };

    getAllChatRoomMessages();

    pingSocketReducer.sendMessage = (stringifiedData: string) => {
      socket.current.send(stringifiedData);
    };

    pongSocketReducer.getMessage = (parsedData: GenericObject) => {
      setChatMessages((prev) => [...prev, parsedData]);
    };
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: GenericObject
  ) => {
    event.preventDefault();

    const newFormData = {
      chatRoomId: currentChat._id,
      sender: currentUser.username,
      message: formData["message"],
    };

    event.currentTarget.reset();

    const response = await createChatMessage(newFormData);

    const stringifiedData = JSON.stringify({
      type: "sendMessage",
      receivers: currentChat.members.filter(
        (userId: string) => userId !== currentUser._id
      ),
      ...response,
    });

    setChatMessages((prev) => [...prev, response]);

    pingSocketReducer.sendMessage(stringifiedData);
  };

  return (
    <section className={styles.default}>
      <ul>
        {chatMessages.map((message) => (
          <li key={message._id}>
            <p>{message.sender}</p>
            <p>{message.message}</p>
            <p>{message.created}</p>
          </li>
        ))}
      </ul>
      <Form fields={inputFields} onSubmit={handleSubmit}></Form>
    </section>
  );
}
