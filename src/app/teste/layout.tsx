import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await cookies();

  return (
    <>
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {s.getAll().map((item) => {
          return <h1 key={item.name}>{item.value}</h1>;
        })}
      </main>
    </>
  );
}
