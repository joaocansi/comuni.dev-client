import { headers } from "next/headers";

import { CreateCommunityForm } from "./_components/create-community-form";

import { authClient } from "@/src/shared/clients/auth-client";
import Navbar from "@/src/components/navbar";
import { SessionProvider } from "@/src/shared/hooks/session.hook";

export default async function Page() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const user = session.data?.user ? session.data.user : null;

  return (
    <>
      <Navbar activePage="" session={session.data} />
      <SessionProvider user={user}>
        <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
          <section>
            <div className="max-w-4xl bg-default-50 mx-auto p-8 rounded-xl mb-8">
              <h3 className="text-3xl font-bold">Crie sua comunidade</h3>
              <p className="mt-2 mb-8">
                Preencha o formulário abaixo para criar sua comunidade. É
                importante lembrar que não temos moderação, portanto, seja
                respeitoso com imagens, textos e etc.
              </p>
              <CreateCommunityForm />
            </div>
          </section>
        </main>
      </SessionProvider>
    </>
  );
}
