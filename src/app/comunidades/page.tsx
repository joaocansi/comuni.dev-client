"use client";

import { FormikProvider, useFormik } from "formik";
import { Divider } from "@heroui/react";

import CommunitiesForm, {
  CommunitiesFormik,
} from "@/src/app/comunidades/_components/communities-form";
import CommunitiesList from "@/src/app/comunidades/_components/communities-list";

export default function Home() {
  const formik = useFormik<CommunitiesFormik>({
    initialValues: {
      city: "",
      category: "",
      state: "",
      tag: "",
      remote: false,
    },
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <section className="flex flex-col justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-extrabold">
            Junte-se a uma <span className="text-primary">Comunidade Tech</span>
            .
          </h2>
          <p>
            Conecte-se com desenvolvedores, compartilhe conhecimento e cresça
            junto em uma rede de inovadores.
          </p>
          <Divider />
          <div className="w-full">
            <CommunitiesForm />
            <CommunitiesList />
          </div>
        </div>
      </section>
    </FormikProvider>
  );
}
