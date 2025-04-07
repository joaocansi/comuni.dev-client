import { FormikProps } from "formik";
import { Textarea as HTextarea } from "@heroui/input";

type InputProps = {
  isRequired: boolean;
  name: string;
  placeholder: string;
  label: string;
  maxRows: number;
  context: FormikProps<any>;
};

export default function Textarea({ context, ...props }: InputProps) {
  return (
    <HTextarea
      {...props}
      errorMessage={context.errors[props.name] as string}
      isInvalid={!!context.errors[props.name]}
      value={context.values[props.name]}
      onChange={context.handleChange}
    />
  );
}
