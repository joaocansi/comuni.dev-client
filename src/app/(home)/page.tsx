"use client";

import { Button, Card, Code, Divider, Image } from "@heroui/react";
import Link from "next/link";

const cardData = [
  {
    imageSrc: "/1.png",
    title: "Crie seu perfil.",
    description:
      "Configure sua conta, mostre suas habilidades e comece a se conectar com devs.",
  },
  {
    imageSrc: "/3.png",
    title: "Entre em comunidades.",
    description:
      "Conecte-se com desenvolvedores que compartilham seus interesses e stack de tecnologia.",
  },
  {
    imageSrc: "/2.png",
    title: "Colabore em projetos.",
    description:
      "Encontre ou inicie projetos e trabalhe com outros para melhorar suas habilidades.",
  },
];

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <div className="max-w-3xl flex flex-col gap-2">
          <h3 className="text-5xl font-bold">
            Conecte-se com{" "}
            <Code className="text-5xl" color="primary">
              desenvolvedores
            </Code>{" "}
            ao redor do Brasil
            <span className="text-primary">.</span>
          </h3>
          <p className="text-lg">
            Conheça desenvolvedores que compartilham sua paixão por programação,
            colabore em projetos empolgantes e expanda sua rede.
          </p>
          <Button
            as={Link}
            className="max-w-28"
            color="primary"
            href="/sign-up"
          >
            Comece agora
          </Button>
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <Divider />
        <h3 className="text-3xl font-bold mb-8">Como funciona?</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {cardData.map((card, index) => (
            <Card
              key={card.title + index}
              fullWidth
              className="transition-transform hover:-translate-y-1 p-3 cursor-pointer"
            >
              <Image
                removeWrapper
                className="rounded-xl h-40 object-cover"
                src={card.imageSrc}
              />
              <h4 className="text-xl font-bold mt-2">{card.title}</h4>
              <p>{card.description}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <Divider />
        <h3 className="text-3xl font-bold mb-8">Nossas estatísticas</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center" />
      </section>
    </>
  );
}
