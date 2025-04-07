import { AnySchema, ValidationError } from "yup";

export async function validateSchema(schema: AnySchema, values: any) {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (!(error instanceof ValidationError)) return null;
    const errors = Object.assign({});

    error.inner.forEach((value) => {
      if (value.path) errors[value.path] = value.message;
    });

    return errors;
  }
}
