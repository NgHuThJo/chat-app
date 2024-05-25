// Third party
import { useEffect, useState } from "react";
// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./UserLIst.module.css";

type UserList = {
  currentUser: GeneralObject;
  onlineUsersId: string[];
  users: GeneralObject[];
};

export function UserList({ currentUser, onlineUsersId, users }: UserList) {
  const [nonContacts, setNonContacts] = useState<GeneralObject[]>([]);

  useEffect(() => {
    setNonContacts(
      users.filter(
        (user) =>
          user._id !== currentUser._id && onlineUsersId.includes(user._id)
      )
    );
  }, [users]);

  return (
    <ul className={styles.layout}>
      <h2>Other Users</h2>
      {nonContacts.map((user) => (
        <li className={styles.user} key={user._id}>
          {user.username}
        </li>
      ))}
    </ul>
  );
}
