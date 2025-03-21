import { headers } from "next/headers";

import { authClient } from "@/src/shared/clients/auth-client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const cookies = await headers();

  return (
    <>
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {cookies.values().map((item) => {
          return <h1 key={item}>{item}</h1>;
        })}
      </main>
    </>
  );
}
