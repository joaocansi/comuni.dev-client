"use server";

import { cookies } from "next/headers";

import { ActionResponse } from "./_action";
import { handleApiError } from "./_api-messager";

import { api } from "@/src/shared/clients/api-client";

export type CreateCommunityEvent = {
  description: string;
  name: string;
  city: string;
  date: Date;
  calendarLink: string;
  state: string;
  address: string;
  format: "IN_PERSON" | "VIRTUAL" | "BOTH" | "";
};

export async function createCommunityEvent(
  communityId: string,
  data: CreateCommunityEvent,
): Promise<ActionResponse<CreateCommunityEvent>> {
  try {
    const requestData = {
      ...data,
      communityId,
    };
    const response = await api.post("/community-events", requestData, {
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
    console.log(error);
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
