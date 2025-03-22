import { headers } from "next/headers";
import axios from "axios";

import Navbar from "@/src/shared/components/navbar";
import { authClient } from "@/src/shared/clients/auth-client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      credentials: "include",
    },
  });

  const { data } = await axios.get("/api", {
    withCredentials: true,
  });

  return (
    <>
      <Navbar activePage="comunidades" session={session.data} />
      {data.t}
      {data.c}
      {data.h}
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {children}
      </main>
    </>
  );
}
