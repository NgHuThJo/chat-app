import { CombinedStyles } from "@/utils/className";

export type ComponentBaseProps = {
  children?: React.ReactNode;
  className?: CombinedStyles;
  restProps?: GeneralObject;
};

export type GeneralObject<T = any> = {
  [key: string]: T;
};
