// Third party
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Contexts
import { useEffect } from "react";
import { useApiDispatchContext } from "../../utility/context/ApiContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import ChatRoom from "../ChatRoom/ChatRoom";
import List from "../../components/List/List";
// Types
import { GeneralObject } from "../../utility/types/utilityType";
// Styles
import styles from "./ChatLayout.module.css";
import { useAuthContext } from "../../utility/context/AuthContext";

function ChatLayout() {
  const socket = useRef();
  const location = useLocation();
  const { createSocket } = useApiDispatchContext();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const getSocket = () => {
      const newSocket = createSocket();
      socket.current = newSocket;
      console.log(currentUser);
      socket.current.addEventListener("open", (event) => {
        pingSocketReducer(event.currentTarget, {
          type: "addUser",
          id: currentUser._id,
        });
      });
      socket.current.addEventListener("message", (event) => {
        pongSocketReducer(event.currentTarget, JSON.parse(event.data));
      });
    };

    getSocket();
  }, []);

  const pongSocketReducer = (socket: WebSocket, action) => {
    switch (action.type) {
      case "getUsers": {
        console.log("Server got users", action);
        break;
      }
      default: {
        throw Error("Unknown action: ".concat(action.type));
      }
    }
  };

  const pingSocketReducer = (socket: WebSocket, action) => {
    switch (action.type) {
      case "addUser": {
        socket.send(JSON.stringify(action));
        break;
      }
      default: {
        throw Error("Unknown action: ".concat(action.type));
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <article className={styles.default}>
      {/* <aside>
         {data && (
          <List>
            {data.map((user: GeneralObject) => (
              <li key={user._id}>
                <Link to={`${location.pathname}/form`}>{user.username}</Link>
              </li>
            ))}
          </List>
        )} 
      </aside> */}
      <ChatRoom></ChatRoom>
    </article>
  );
}

export default ChatLayout;
