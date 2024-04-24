// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./List.module.css";

function List({ children, className, ...restProps }: ComponentBaseProps) {
  return (
    <ul className={styles[className!]} {...restProps}>
      {children}
    </ul>
  );
}

export default List;
