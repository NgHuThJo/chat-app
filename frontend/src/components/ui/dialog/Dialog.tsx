// React
import { forwardRef } from "react";
// Types
import { ComponentBaseProps } from "@/types";
// Styles
import styles from "./Dialog.module.css";

export const Dialog = forwardRef<HTMLDialogElement, ComponentBaseProps>(
  (props, ref) => (
    <dialog className={styles[props.className]} ref={ref}>
      {props.children}
    </dialog>
  )
);
Dialog.displayName = "Dialog";
