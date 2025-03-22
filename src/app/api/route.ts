import { cookies, headers } from "next/headers";

import { api } from "@/src/shared/clients/api-client";

export async function GET(request: Request): Promise<any> {
  const t = await cookies();
  const c = await headers();

  const response = await api.get(`/communities/golangers`);
  const data = response.data;

  return Response.json({ data, t, c, h: request.headers });
}
