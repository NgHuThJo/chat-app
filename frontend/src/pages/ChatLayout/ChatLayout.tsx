// Third party
import { Link, useLocation } from "react-router-dom";
// Contexts
import { useEffect } from "react";
import { useApiContext } from "../../utility/context/ApiContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import ChatRoom from "../ChatRoom/ChatRoom";
import List from "../../components/List/List";
// Types
import { GeneralObject } from "../../utility/types/utilityType";
// Styles
import styles from "./ChatLayout.module.css";

function ChatLayout() {
  const location = useLocation();
  const { apiBaseUrl } = useApiContext();
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${apiBaseUrl}/chat`, {
      method: "GET",
    });
  }, []);

  return (
    <article className={styles.default}>
      <aside>
        {data && (
          <List>
            {data.map((user: GeneralObject) => (
              <li key={user._id}>
                <Link to={`${location.pathname}/form`}>{user.username}</Link>
              </li>
            ))}
          </List>
        )}
      </aside>
      <ChatRoom></ChatRoom>
    </article>
  );
}

export default ChatLayout;
