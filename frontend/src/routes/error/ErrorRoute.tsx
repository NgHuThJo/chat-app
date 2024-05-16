// Third party
import { Link } from "react-router-dom";
// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./ErrorRoute.module.css";

export function ErrorRoute({
  className = "default",
  ...restProps
}: ComponentBaseProps) {
  return (
    <div className={styles[className]} {...restProps}>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/" replace>
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
