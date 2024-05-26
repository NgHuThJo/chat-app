// Third party
import { SetStateAction, useEffect, useState } from "react";
// Components
// API
import { createChatRoom } from "../../api/chat";
// Utility
import { resolveClassName } from "@/utils/className";
// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./ChatSidebar.module.css";

type ChatSidebar = {
  changeChat: React.Dispatch<SetStateAction<GeneralObject>>;
  chatRooms: GeneralObject[];
  setChatRooms: React.Dispatch<SetStateAction<GeneralObject[]>>;
  currentUser: GeneralObject;
  onlineUsersId: string[] | undefined;
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
  const [selectedChat, setSelectedChat] = useState<string>();
  const [nonContacts, setNonContacts] = useState<GeneralObject[]>([]);

  useEffect(() => {
    if (!onlineUsersId) {
      return;
    }

    const onlineUsers = users.filter(
      (user) => user._id !== currentUser._id && onlineUsersId.includes(user._id)
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
  }, [onlineUsersId]);

  const handleCreateChatRoom = async (user: GeneralObject) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };

    const response = await createChatRoom(members);

    changeChat(response);
    setSelectedChat(response._id);
    setChatRooms((prev) => [...prev, response]);
  };

  const changeCurrentChat = (room: GeneralObject) => {
    setSelectedChat(room._id);
    changeChat(room);
  };

  return (
    <aside className={styles.layout}>
      <h2>Chats</h2>
      <ul>
        {chatRooms.map((room) => (
          <li
            className={resolveClassName(
              {
                module: ["room", ...(selectedChat ? ["selected"] : [])],
              },
              styles
            )}
            key={room._id}
            onClick={() => changeCurrentChat(room)}
          >
            {room._id}
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
