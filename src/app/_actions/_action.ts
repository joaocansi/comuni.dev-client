"use server";

import { cookies } from "next/headers";

export type ActionResponse<T> = {
  data: T | null;
  error: {
    message: string;
    type: string;
  } | null;
};

export const sessionCookies = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  return cookieHeader;
};
