import { FormikProps } from "formik";
import { Input as HInput } from "@heroui/input";

type InputProps = {
  isRequired: boolean;
  name: string;
  placeholder: string;
  label: string;
  context: FormikProps<any>;
};

export default function Input({ context, ...props }: InputProps) {
  return (
    <HInput
      {...props}
      errorMessage={context.errors[props.name] as string}
      isInvalid={!!context.errors[props.name]}
      isRequired={false}
      value={context.values[props.name]}
      onChange={context.handleChange}
    />
  );
}
