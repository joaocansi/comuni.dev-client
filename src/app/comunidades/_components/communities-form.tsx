"use client";

import { Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";

import { getStateCities, getStates } from "../../../shared/constants/location";
import { categories, technologies } from "../../../shared/constants/categories";

export type CommunitiesFormik = {
  state: string;
  city: string;
  category: string;
  tag: string;
  remote: boolean;
};

export default function CommunitiesForm() {
  const formik = useFormikContext<CommunitiesFormik>();
  const states = getStates();
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    setCities(getStateCities(formik.values.state) || []);
    formik.setFieldValue("city", "");
  }, [formik.values.state]);

  return (
    <Form className="w-full flex gap-2 flex-col" onSubmit={formik.handleSubmit}>
      <div className="w-full grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2 gap-2">
        <Select
          className="w-full"
          label="Selecione o Estado"
          name="state"
          size="sm"
          onChange={formik.handleChange}
        >
          {states.map((state) => (
            <SelectItem key={state.abbr}>{state.name}</SelectItem>
          ))}
        </Select>
        <Select
          className="w-full"
          isDisabled={cities.length === 0}
          label="Selecione a Cidade"
          name="city"
          size="sm"
          onChange={formik.handleChange}
        >
          {cities.map((city) => (
            <SelectItem key={city}>{city}</SelectItem>
          ))}
        </Select>
        <Select
          className="w-full col-span-2 max-lg:col-span-1"
          label="Selecione o categoria"
          name="category"
          size="sm"
          onChange={formik.handleChange}
        >
          {categories.map((category) => (
            <SelectItem key={category}>{category}</SelectItem>
          ))}
        </Select>
        <Select
          className="w-full"
          label="Selecione a tecnologia"
          name="tag"
          size="sm"
          onChange={formik.handleChange}
        >
          {technologies.map((technology) => (
            <SelectItem key={technology}>{technology}</SelectItem>
          ))}
        </Select>
      </div>
    </Form>
  );
}
