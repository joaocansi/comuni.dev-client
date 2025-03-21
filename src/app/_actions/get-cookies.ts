"use server";

import { ActionResponse, sessionCookies } from "./_action";

export type Community = {
  id: string;
  totalMembers: number;
  tags: string[];
  name: string;
  description: string;
  image: string;
  slug: string;
  owner: {
    id: string;
  };
  sessionUser: string;
};

export async function getCookies(): Promise<ActionResponse<string>> {
  const cookieHeader = await sessionCookies();

  return {
    data: cookieHeader,
    error: null,
  };
}
