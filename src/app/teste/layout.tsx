import { cookies } from "next/headers";

import { getCookies } from "../_actions/get-cookies";
import test from "../_actions/test";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await cookies();
  const { data } = await getCookies();

  await test();

  return (
    <>
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {s.getAll().map((item) => {
          return <h1 key={item.name}>{item.value}</h1>;
        })}
        <h1>{data}</h1>
      </main>
    </>
  );
}
