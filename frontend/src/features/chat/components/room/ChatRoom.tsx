// Third party
import { useEffect, useRef, useState } from "react";
// Components
import { Form } from "@/components/ui/form";
// API
import { createChatMessage, getChatMessages } from "../../api/chat";
// Types
import { GenericObject } from "@/types";
// Styles
import styles from "./ChatRoom.module.css";

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
  const scrollRef = useRef();

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
      if (currentChat._id === parsedData.chatRoomId) {
        setChatMessages((prev) => [...prev, parsedData]);
      }
    };
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

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
        (userId: string) => userId._id !== currentUser._id
      ),
      ...response,
    });

    setChatMessages((prev) => [...prev, response]);

    pingSocketReducer.sendMessage(stringifiedData);
  };

  return (
    <section className={styles.default}>
      <ul className={styles["scroll-container"]}>
        {chatMessages.map((message) => (
          <li
            className={
              styles[
                message.sender === currentUser.username
                  ? "message-left"
                  : "message-right"
              ]
            }
            key={message._id}
            ref={scrollRef}
          >
            <h3>{message.sender}</h3>
            <p>{message.message}</p>
            <p>{message.created}</p>
          </li>
        ))}
      </ul>
      <Form fields={inputFields} onSubmit={handleSubmit}></Form>
    </section>
  );
}
