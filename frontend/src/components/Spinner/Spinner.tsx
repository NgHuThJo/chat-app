// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Spinner.module.css";

function Spinner({
  className = "spinner--default",
  ...restProps
}: ComponentBaseProps) {
  return <div className={styles[className]} {...restProps}></div>;
}

export default Spinner;
