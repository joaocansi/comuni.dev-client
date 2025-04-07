import { FormikProps } from "formik";
import { DatePicker as HDatePicker } from "@heroui/date-picker";

type DatePickerProps = {
  isRequired: boolean;
  name: string;
  label: string;
  showMonthAndYearPickers?: boolean;
  context: FormikProps<any>;
};

export default function DatePicker({ context, ...props }: DatePickerProps) {
  return (
    <HDatePicker
      defaultValue={context.values[props.name]}
      {...props}
      onChange={(value) => context.setFieldValue(props.name, value)}
    />
  );
}
