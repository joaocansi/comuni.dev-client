"use server";

import { cookies } from "next/headers";

export default async function test() {
  const ocokies = await cookies();

  ocokies.set("test", "teste", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 99999,
  });
}
