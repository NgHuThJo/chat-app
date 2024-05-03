// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
import styles from "./Sidebar.module.css";

function Sidebar({ children, className }: ComponentBaseProps) {
  return <aside className={styles[className!]}>{children}</aside>;
}

export default Sidebar;
