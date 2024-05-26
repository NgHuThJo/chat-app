// Third party
import { useEffect, useRef, useState } from "react";
// Context
import { useAuthContext } from "@/providers/context";
// Custom hooks
// Components
import { ChatLayout } from "@/components/layouts/chat/ChatLayout";
import { ChatRoom } from "../../components/room/ChatRoom";
import { ChatSidebar } from "../../components/sidebar/ChatSidebar";
import { ChatWelcome } from "../../components/welcome/ChatWelcome";
// Feature specifics
import { createSocket } from "../../api/webSocket";
import { getUsers } from "@/features/user/api/list";
// Types
import { GeneralObject } from "@/types";
import { getChatRooms } from "../../api/chat";

export function ChatRoute() {
  const [chatRooms, setChatRooms] = useState<GeneralObject[]>([]);
  const [currentChat, setCurrentChat] = useState<GeneralObject>();
  const [onlineUsersId, setOnlineUsersId] = useState<string[]>();
  const [users, setUsers] = useState<GeneralObject[]>([]);
  const { currentUser } = useAuthContext();
  const socket = useRef<WebSocket>();

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
    const newSocket = createSocket();
    socket.current = newSocket;

    socket.current.addEventListener("open", (event: Event) => {
      const data = {
        type: "addUser",
        id: currentUser._id,
      };

      pingSocketReducer(event.currentTarget as WebSocket, data);
    });

    socket.current.addEventListener("message", (event: MessageEvent) => {
      pongSocketReducer(event.currentTarget as WebSocket, event.data);
    });

    socket.current.addEventListener("close", (event: CloseEvent) => {
      console.log(event.code, event.reason, event.wasClean);
    });

    return () => {
      socket.current.close();
    };
  }, []);

  const pongSocketReducer = (socket: WebSocket, action: string) => {
    const parsedAction = JSON.parse(action);

    switch (parsedAction.type) {
      case "getUsers": {
        console.log("Server got users", parsedAction);
        const { users } = parsedAction.data;
        setOnlineUsersId(users);

        break;
      }
      default: {
        throw Error("Unknown action: ".concat(parsedAction.type));
      }
    }
  };

  const pingSocketReducer = (socket: WebSocket, action: GeneralObject) => {
    const stringifiedAction = JSON.stringify(action);

    switch (action.type) {
      case "addUser": {
        socket.send(stringifiedAction);
        break;
      }
      default: {
        throw Error("Unknown action: ".concat(action.type));
      }
    }
  };

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
          socket={socket}
        />
      ) : (
        <ChatWelcome />
      )}
    </ChatLayout>
  );
}
