// Third party
import { useEffect, useState } from "react";
// Components
import { getUserList } from "../../api/list";
// Types
import { GeneralObject } from "@/types";
// Styles
import styles from "./UserLIst.module.css";

type UserList = {
  currentUser: GeneralObject;
  onlineUsersId: string[];
};

export function UserList({ currentUser, onlineUsersId }: UserList) {
  return (
    <ul className={styles.layout}>
      <h2>Other Users</h2>
      {userList.map((user) => (
        <li className={styles.user} key={user._id}>
          {user.username}
        </li>
      ))}
    </ul>
  );
}
