import { Dispatch, SetStateAction } from "react";

export type IModelProps<T> = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
} & T;
