// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./Spinner.module.css";

function Spinner({ className, ...restProps }: ComponentBaseProps) {
  return <div className={styles[className]} {...restProps}></div>;
}

export default Spinner;
