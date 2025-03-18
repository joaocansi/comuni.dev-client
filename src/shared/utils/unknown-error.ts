import { AxiosError } from "axios";

export function isAxiosError(error: unknown) {
  if (error instanceof AxiosError) return true;
  throw new Error("Problema interno detectado. Tente novamente mais tarde");
}
