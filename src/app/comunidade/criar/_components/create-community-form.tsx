"use client";

import {
  Avatar,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
  Form,
  Button,
  addToast,
} from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { categories, technologies } from "@/src/shared/constants/categories";
import {
  createCommunity,
  CreateCommunity,
} from "@/src/app/_actions/create-community.action";
import { getStateCities, getStates } from "@/src/shared/constants/location";

export const CreateCommunityForm = () => {
  const states = getStates();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const handleCreateCommunity = async (values: CreateCommunity) => {
    const { data, error } = await createCommunity(values);

    if (error) {
      setLoading(false);
      addToast({ title: "Erro", description: error.message, color: "danger" });

      return;
    }

    setLoading(false);
    addToast({
      title: "Sucesso",
      description: "Comunidade criada com sucesso.",
      color: "success",
    });
    if (data) router.push("/comunidade/" + data.slug);
  };

  const { handleChange, handleSubmit, values, setFieldValue } =
    useFormik<CreateCommunity>({
      initialValues: {
        description: "",
        city: "",
        category: "",
        state: "",
        image: "",
        name: "",
        tags: [],
      },
      onSubmit: handleCreateCommunity,
    });

  useEffect(() => {
    setCities(getStateCities(values.state) || []);
    setFieldValue("city", "");
  }, [values.state]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center w-full mb-4">
        <Avatar
          isBordered
          className="min-w-48 min-h-48"
          size="lg"
          src={values.image}
        />
        <Input
          className="w-full"
          defaultValue={values.image}
          label="Imagem da comunidade"
          name="image"
          placeholder="Copie a URL da imagem da comunidade"
          onBlur={handleChange}
        />
      </div>
      <Input
        defaultValue={values.name}
        label="Nome da comunidade"
        name="name"
        placeholder="Digite o nome para comunidade"
        onChange={handleChange}
      />
      <Textarea
        defaultValue={values.description}
        label="Descrição da comunidade"
        maxRows={5}
        name="description"
        placeholder="Fale um pouco mais sobre a comunidade"
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 w-full gap-2">
        <Select
          aria-label="Estado"
          className="w-full col-span-1"
          label="Cidade"
          name="state"
          onChange={handleChange}
        >
          {states.map((state) => (
            <SelectItem key={state.abbr}>{state.name}</SelectItem>
          ))}
        </Select>

        <Select
          aria-label="Cidade"
          className="w-full col-span-1"
          isDisabled={values.state === ""}
          label="Cidade"
          name="city"
          placeholder="Selecione a cidade"
          onChange={handleChange}
        >
          {cities.map((state) => (
            <SelectItem key={state}>{state}</SelectItem>
          ))}
        </Select>
      </div>
      <Select
        aria-label="Categoria"
        className="w-full col-span-1"
        label="Categoria"
        name="category"
        placeholder="Selecione a categoria da comunidade"
        onChange={handleChange}
      >
        {categories.map((state) => (
          <SelectItem key={state}>{state}</SelectItem>
        ))}
      </Select>
      <Select
        aria-label="Tags da comunidade"
        classNames={{
          trigger: "min-h-12 py-2",
        }}
        defaultSelectedKeys={values.tags}
        isMultiline={true}
        label="Tags da comunidade"
        name="tags"
        placeholder="Selecione as tags da comunidade"
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-1 mt-1">
              {items.map((item) => (
                <Chip key={item.key}>{item.textValue}</Chip>
              ))}
            </div>
          );
        }}
        selectionMode="multiple"
        onChange={(e) => {
          setFieldValue(e.target.name, e.target.value.split(","));
        }}
      >
        {technologies.map((tag) => (
          <SelectItem key={tag}>{tag}</SelectItem>
        ))}
      </Select>

      <Button
        fullWidth
        className="mt-2"
        color="primary"
        isLoading={loading}
        size="lg"
        type="submit"
      >
        Criar
      </Button>
    </Form>
  );
};
