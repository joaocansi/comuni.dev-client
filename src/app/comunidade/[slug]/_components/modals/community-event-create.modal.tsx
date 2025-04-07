import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Form,
  addToast,
} from "@heroui/react";
import { FormikHelpers, useFormik } from "formik";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

import { IModelProps } from "@/src/shared/modal";
import { useCommunity } from "@/src/shared/hooks/community.hook";
import { getStateCities, getStates } from "@/src/shared/constants/location";
import Input from "@/src/components/input";
import DatePicker from "@/src/components/date-picker";
import Select from "@/src/components/select";
import { KeyLabel } from "@/src/@types";
import Textarea from "@/src/components/textarea";
import { createCommunityEvent } from "@/src/app/_actions/create-community-event.action";
import { validateSchema } from "@/src/shared/utils/yup-validate";

type CommunityEventCreateModalProps = IModelProps<{}>;

const formatList = [
  {
    key: "IN_PERSON",
    label: "Presencial",
  },
  {
    key: "VIRTUAL",
    label: "Remoto",
  },
  {
    key: "BOTH",
    label: "Hibrído",
  },
];

const CommunityEventCreateSchema = Yup.object().shape({
  address: Yup.string().when(([format], schema) => {
    return format === "IN_PERSON" || format === "BOTH"
      ? schema.required()
      : schema;
  }),
  city: Yup.string().when(([format, state], schema) => {
    return format === "IN_PERSON" || format === "BOTH"
      ? schema.required().oneOf(getStateCities(state) || [])
      : schema;
  }),
  state: Yup.string().when(([format], schema) => {
    const states = getStates().map((item) => item.abbr);

    return format === "IN_PERSON" || format === "BOTH"
      ? schema.required().oneOf(states)
      : schema;
  }),
  date: Yup.string(),
  description: Yup.string().required().min(20),
  calendarLink: Yup.string(),
  format: Yup.string(),
  name: Yup.string().required().min(5),
});

type CreateCommunityEvent = {
  description: string;
  name: string;
  city: string;
  date: ZonedDateTime;
  calendarLink: string;
  state: string;
  address: string;
  format: "IN_PERSON" | "VIRTUAL" | "BOTH" | "";
};

export const CommunityEventCreateModal = ({
  isOpen,
  setOpen,
}: CommunityEventCreateModalProps) => {
  const { community, refreshCommunity } = useCommunity();
  const initialValues: CreateCommunityEvent = {
    address: "",
    city: "",
    description: "",
    calendarLink: "",
    format: "",
    name: "",
    state: "",
    date: now(getLocalTimeZone()),
  };

  const handleCreateSubmit = async (
    values: CreateCommunityEvent,
    helpers: FormikHelpers<CreateCommunityEvent>,
  ) => {
    const validationErrors = await validateSchema(
      CommunityEventCreateSchema,
      values,
    );

    if (validationErrors) {
      helpers.setErrors(validationErrors);

      return;
    }

    const processedData = {
      ...values,
      date: values.date.toDate(),
    };
    const { error } = await createCommunityEvent(community.id, processedData);

    if (error) {
      addToast({
        title: "Erro",
        description: error.message,
        color: "danger",
        variant: "bordered",
      });

      return;
    }

    helpers.setValues(initialValues);
    await refreshCommunity();
    addToast({
      title: "Sucesso",
      description: "Evento da comunidade criado com sucesso.",
      color: "success",
      variant: "bordered",
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const formik = useFormik<CreateCommunityEvent>({
    initialValues,
    onSubmit: handleCreateSubmit,
  });

  const states: KeyLabel[] = getStates().map((item) => ({
    key: item.abbr,
    label: item.name,
  }));

  const [cities, setCities] = useState<KeyLabel[]>([]);

  useEffect(() => {
    const cities = getStateCities(formik.values.state) || [];
    const convertedCities = cities.map((item) => ({
      key: item,
      label: item,
    }));

    setCities(convertedCities);
    formik.setFieldValue("city", "");
  }, [formik.values.state]);

  const mustPassLocation = useCallback(() => {
    return (
      formik.values.format === "BOTH" || formik.values.format === "IN_PERSON"
    );
  }, [formik.values]);

  return (
    <Modal
      className="max-w-xl"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Criar Evento
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={formik.handleSubmit}>
                <Input
                  isRequired
                  context={formik}
                  label="Nome do evento"
                  name="name"
                  placeholder="Digite o nome do evento"
                />
                <Textarea
                  isRequired
                  context={formik}
                  label="Descrição do evento"
                  maxRows={5}
                  name="description"
                  placeholder="Fale um pouco mais sobre o evento."
                />
                <Select
                  isRequired
                  context={formik}
                  items={formatList}
                  label="Modelo do Evento"
                  name="format"
                  placeholder="Qual será o formato do seu evento?"
                />
                <div
                  className={`flex flex-col gap-2 ${!mustPassLocation() && "hidden"} w-full`}
                >
                  <div className={`flex gap-2 w-full`}>
                    <Select
                      isRequired
                      context={formik}
                      items={states}
                      label="Selecione o Estado"
                      name="state"
                      placeholder="Qual estado vai acontecer?"
                    />

                    <Select
                      isRequired
                      context={formik}
                      isDisabled={cities.length === 0}
                      items={cities}
                      label="Selecione a Cidade"
                      name="city"
                      placeholder="Qual cidade vai acontecer?"
                    />
                  </div>

                  <Input
                    isRequired
                    context={formik}
                    label="Endereço do evento"
                    name="address"
                    placeholder="Digite onde o evento vai ocorrer presencialmente"
                  />
                </div>

                <I18nProvider locale="pt-br">
                  <DatePicker
                    isRequired
                    context={formik}
                    label="Data do Evento"
                    name="date"
                  />
                </I18nProvider>

                <Input
                  isRequired
                  context={formik}
                  label="Link do convite"
                  name="calendarLink"
                  placeholder="Digite o link do convite (Google, Outlook e etc)"
                />

                <div className="flex gap-2 ml-auto mt-4">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" type="submit">
                    Criar
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
