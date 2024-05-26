// Third party
import { SetStateAction, useEffect, useState } from "react";
// Components
// API
import { createChatRoom } from "../../api/chat";
// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./ChatSidebar.module.css";

type ChatSidebar = {
  changeChat: React.Dispatch<SetStateAction<GeneralObject>>;
  chatRooms: GeneralObject[];
  setChatRooms: React.Dispatch<SetStateAction<GeneralObject[]>>;
  currentUser: GeneralObject;
  onlineUsersId: string[];
  users: GeneralObject[];
};

export function ChatSidebar({
  changeChat,
  chatRooms,
  setChatRooms,
  currentUser,
  onlineUsersId,
  users,
}: ChatSidebar) {
  const [contacts, setContacts] = useState<GeneralObject[]>([]);
  const [nonContacts, setNonContacts] = useState<GeneralObject[]>([]);

  useEffect(() => {
    const onlineUsers = users.filter(
      (user) => user._id !== currentUser._id && onlineUsersId.includes(user._id)
    );

    setContacts(
      onlineUsers.filter((user) => {
        for (const room of chatRooms) {
          if (room.members.includes(user._id)) {
            return true;
          }
        }

        return false;
      })
    );

    setNonContacts(
      onlineUsers.filter((user) => {
        for (const room of chatRooms) {
          if (room.members.includes(user._id)) {
            return false;
          }
        }

        return true;
      })
    );
  }, [users]);

  const handleCreateChatRoom = async (user: GeneralObject) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };

    const response = await createChatRoom(members);

    changeChat(response);
    setChatRooms((prev) => [...prev, response]);
  };

  return (
    <aside className={styles.layout}>
      <h2>Chats</h2>
      <ul>
        {contacts.map((user) => (
          <li
            className={styles.user}
            key={user._id}
            onClick={() => changeChat(user)}
          >
            {user._id}
          </li>
        ))}
      </ul>
      <h2>Other Users</h2>
      <ul>
        {nonContacts.map((user) => (
          <li
            className={styles.user}
            key={user._id}
            onClick={() => handleCreateChatRoom(user)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </aside>
  );
}
