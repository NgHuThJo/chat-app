// React
import { forwardRef } from "react";
// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./Dialog.module.css";

const Dialog = forwardRef<HTMLDialogElement, ComponentBaseProps>(
  (props, ref) => (
    <dialog className={styles[props.className!]} ref={ref}>
      {props.children}
    </dialog>
  )
);
Dialog.displayName = "Dialog";

export default Dialog;
