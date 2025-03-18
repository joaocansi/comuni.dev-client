"use server";

import { ActionResponse, sessionCookies } from "./_action";
import { handleApiError } from "./_api-messager";
import { Community } from "./get-community.action";

import { api } from "@/src/shared/clients/api-client";

export type UpdateCommunity = {
  tags: string[];
  name: string;
  description: string;
  image: string;
};

export async function updateCommunity(
  id: string,
  data: UpdateCommunity,
): Promise<ActionResponse<Community>> {
  const cookieHeader = await sessionCookies();

  try {
    const response = await api.patch(`/communities/${id}`, data, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    const result = response.data;

    return {
      data: result,
      error: null,
    };
  } catch (error) {
    const { type, message } = handleApiError(error);

    return {
      data: null,
      error: {
        message,
        type,
      },
    };
  }
}
