// Third party
import { useEffect, useState } from "react";
// Context
import {
  useAuthContext,
  useWebSocketContext,
  useWebSocketDispatchContext,
} from "@/providers/context";
// Custom hooks
// Components
import { ChatLayout } from "@/components/layouts/chat/ChatLayout";
import { ChatRoom } from "../../components/room/ChatRoom";
import { ChatSidebar } from "../../components/sidebar/ChatSidebar";
import { ChatWelcome } from "../../components/welcome/ChatWelcome";
// API
import { getUsers } from "@/features/user/api/list";
// Types
import { GenericObject } from "@/types";
import { getChatRooms } from "../../api/chat";

export function ChatRoute() {
  const [chatRooms, setChatRooms] = useState<GenericObject[]>([]);
  const [currentChat, setCurrentChat] = useState<GenericObject>();
  const [onlineUsersId, setOnlineUsersId] = useState<string[]>();
  const [users, setUsers] = useState<GenericObject[]>([]);
  const { currentUser } = useAuthContext();
  const { socket, pingSocketReducer, pongSocketReducer } =
    useWebSocketContext();
  const { createSocket } = useWebSocketDispatchContext();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getUsers();

      setUsers(response);
    };

    const getAllChatRooms = async () => {
      const response = await getChatRooms(currentUser._id);

      setChatRooms(response);
    };

    Promise.all([getAllUsers(), getAllChatRooms()]);
  }, []);

  useEffect(() => {
    if (socket.current) {
      return;
    }

    createSocket();

    pingSocketReducer.addUser = (stringifiedData: string) => {
      socket.current.send(stringifiedData);
    };

    pongSocketReducer.getUsers = (parsedData: GenericObject) => {
      console.log("Server got users: ", parsedData);
      const { users } = parsedData;
      setOnlineUsersId(users);
    };

    socket.current.addEventListener("open", () => {
      const data = {
        type: "addUser",
        id: currentUser._id,
      };

      const stringifiedData = JSON.stringify(data);

      pingSocketReducer.addUser(stringifiedData);
    });

    socket.current.addEventListener("message", (event: MessageEvent) => {
      const parsedEventData = JSON.parse(event.data);

      pongSocketReducer[parsedEventData.type](parsedEventData.data);
    });

    socket.current.addEventListener("close", (event: CloseEvent) => {
      console.log(event.code, event.reason, event.wasClean);
    });
  }, []);

  return (
    <ChatLayout>
      <ChatSidebar
        changeChat={setCurrentChat}
        chatRooms={chatRooms}
        setChatRooms={setChatRooms}
        currentUser={currentUser}
        onlineUsersId={onlineUsersId}
        users={users}
      />
      {currentChat ? (
        <ChatRoom
          currentChat={currentChat}
          currentUser={currentUser}
          pingSocketReducer={pingSocketReducer}
          pongSocketReducer={pongSocketReducer}
          socket={socket}
        />
      ) : (
        <ChatWelcome />
      )}
    </ChatLayout>
  );
}
