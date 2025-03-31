"use server";

import { cookies } from "next/headers";

import { ActionResponse } from "./_action";
import { handleApiError } from "./_api-messager";

import { api } from "@/src/shared/clients/api-client";

export type CreateCommunity = {
  description: string;
  image: string;
  city: string;
  state: string;
  name: string;
  category: string;
  tags: string[];
};

export async function createCommunity(
  data: CreateCommunity,
): Promise<ActionResponse<CreateCommunity & { slug: string }>> {
  try {
    const response = await api.post(`/communities`, data, {
      headers: {
        Cookie: (await cookies()).toString(),
      },
    });
    const responseData = response.data;

    return {
      data: responseData,
      error: null,
    };
  } catch (error) {
    const { type, message } = handleApiError(error, {
      ["COMMUNITY_ALREADY_EXISTS"]:
        "O nome '" + data.name + "' já está em uso. Tente outro.",
    });

    return {
      data: null,
      error: {
        message,
        type,
      },
    };
  }
}
