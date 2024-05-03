// Types
import { GeneralObject } from "../../utility/types/utilityType";
// Styles
import styles from "./Paragraph.module.css";

function Paragraph({ children, className, ...restProps }: GeneralObject) {
  return (
    <p className={styles[className!]} {...restProps}>
      {children}
    </p>
  );
}

export default Paragraph;
