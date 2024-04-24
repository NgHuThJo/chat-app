export type GeneralObject<T = any> = {
  [key: string]: T;
};

export type Position = {
  x: number;
  y: number;
};

export interface Position3D extends Position {
  z: number;
}

export type ComponentBaseProps = {
  children?: React.ReactNode;
  className?: string;
  restProps?: GeneralObject;
};
