import { api } from "@/src/shared/clients/api-client";

export async function GET() {
  const response = await api.get(`/communities/golangers`);
  const data = response.data;

  return Response.json({ data });
}
