import { FormikProps } from "formik";
import { Select as HSelect, SelectItem } from "@heroui/select";

type SelectProps = {
  fullWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  label: string;
  placeholder?: string;
  name: string;
  items: {
    key: string;
    label: string;
  }[];
  context: FormikProps<any>;
};

export default function Select({
  context,
  fullWidth = true,
  ...props
}: SelectProps) {
  return (
    <HSelect
      autoComplete="off"
      className={`${fullWidth && "w-full"}`}
      errorMessage={context.errors[props.name] as string}
      isInvalid={!!context.errors[props.name]}
      selectedKeys={
        context.values[props.name] ? [context.values[props.name]] : []
      }
      onChange={context.handleChange}
      {...props}
    >
      {props.items.map((item) => {
        return <SelectItem key={item.key}>{item.label}</SelectItem>;
      })}
    </HSelect>
  );
}
