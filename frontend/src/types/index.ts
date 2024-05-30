import { CombinedStyles } from "@/utils/className";

type ObjectKey = string | number | symbol;

export type ComponentBaseProps = {
  children?: React.ReactNode;
  className?: CombinedStyles | string;
  restProps?: GenericObject;
};

export type ContextProps = {
  children?: React.ReactNode;
};

export type GenericObject<T = any, K extends ObjectKey = string> = {
  [P in K]: T;
};
