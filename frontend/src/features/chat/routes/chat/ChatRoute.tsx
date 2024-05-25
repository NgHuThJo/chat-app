// Third party
import { useEffect, useRef, useState } from "react";
// Context
import { useAuthContext } from "@/providers/context";
// Custom hooks
// Components
import { ChatLayout } from "@/components/layouts/chat/ChatLayout";
import { ChatRoom } from "../../components/room/ChatRoom";
import { ChatWelcome } from "../../components/welcome/ChatWelcome";
import { UserList } from "@/features/user/components/list/UserList";
// Feature specifics
import { createSocket } from "../../api/webSocket";
import { getUsers } from "@/features/user/api/list";
// Types
import { GeneralObject } from "@/types";

export function ChatRoute() {
  const [users, setUsers] = useState([]);
  const [onlineUsersId, setOnlineUsersId] = useState([]);
  const { currentUser } = useAuthContext();
  const socket = useRef<WebSocket>();

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getUsers();

      setUsers(response);
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
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
    }
  }, [currentUser]);

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

  const isTrue = false;

  return (
    <ChatLayout>
      <UserList
        currentUser={currentUser}
        onlineUsersId={onlineUsersId}
        users={users}
      />
      {isTrue ? <ChatRoom /> : <ChatWelcome />}
    </ChatLayout>
  );
}
