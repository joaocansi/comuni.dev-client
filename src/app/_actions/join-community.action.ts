import { ActionResponse } from "./_action";
import { handleApiError } from "./_api-messager";

import { api } from "@/src/shared/clients/api-client";

export async function joinCommunity(
  communityId: string,
): Promise<ActionResponse<void>> {
  try {
    const response = await api.post("/communities/" + communityId + "/join");
    const data = response.data;

    return {
      data,
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
