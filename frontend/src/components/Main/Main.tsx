import { ComponentBaseProps } from "../../utility/types/utilityType";
import styles from "./Main.module.css";

function Main({ children, className, ...restProps }: ComponentBaseProps) {
  return (
    <main className={styles[className!]} {...restProps}>
      {children}
    </main>
  );
}

export default Main;
