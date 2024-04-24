// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Button.module.css";

function Button({ children, className, ...restProps }: ComponentBaseProps) {
  return (
    <button className={styles[className!]} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
