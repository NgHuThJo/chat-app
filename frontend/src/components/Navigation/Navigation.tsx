// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Navigation.module.css";

function Navigation({ children, className, ...restProps }: ComponentBaseProps) {
  return (
    <nav className={styles[className!]} {...restProps}>
      {children}
    </nav>
  );
}
export default Navigation;
