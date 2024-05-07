// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Button.module.css";

type ButtonProps = ComponentBaseProps & {
  onClick?: () => void;
  type?: string;
};

function Button({
  children,
  className,
  type = "submit",
  ...restProps
}: ButtonProps) {
  return (
    <button className={styles[className!]} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
