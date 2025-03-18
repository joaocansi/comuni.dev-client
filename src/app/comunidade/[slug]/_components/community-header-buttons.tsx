"use client";

import {
  addToast,
  Avatar,
  Button,
  Chip,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useFormik } from "formik";

import { joinCommunity } from "@/src/app/_actions/join-community.action";
import { Community } from "@/src/app/_actions/get-community.action";
import { useCommunity } from "@/src/shared/hooks/community.hook";
import { leaveCommunity } from "@/src/app/_actions/leave-community.action";
import { technologies } from "@/src/shared/constants/categories";
import {
  updateCommunity,
  UpdateCommunity,
} from "@/src/app/_actions/update-community.action";

type CommunityHeaderButtonsProps = {
  community: Community;
};

export function CommunityHeaderButtons({
  community,
}: CommunityHeaderButtonsProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { sessionRole, refreshCommunity } = useCommunity();
  const isMember = sessionRole === "DEFAULT";

  const handleJoinButton = async () => {
    setLoading(true);
    const { error } = await joinCommunity(community.id);

    if (error) {
      setLoading(false);
      addToast({ title: "Erro", description: error.message, color: "danger" });

      return;
    }

    await refreshCommunity();
    setLoading(false);

    addToast({
      title: "Sucesso",
      description: "Agora você participa da comunidade.",
      color: "success",
    });
  };

  const handleLeaveButton = async () => {
    setLoading(true);
    const { error } = await leaveCommunity(community.id);

    if (error) {
      setLoading(false);
      addToast({ title: "Erro", description: error.message, color: "danger" });

      return;
    }

    await refreshCommunity();
    setLoading(false);

    addToast({
      title: "Sucesso",
      description: "Você saiu das comunidade",
      color: "success",
    });
  };

  const handleEditButton = () => {
    setIsOpen(true);
  };

  const handleEditSubmit = async (values: UpdateCommunity) => {
    setLoading(true);
    const { error } = await updateCommunity(community.id, values);

    if (error) {
      setLoading(false);
      addToast({ title: "Erro", description: error.message, color: "danger" });

      return;
    }

    await refreshCommunity();
    setLoading(false);
    addToast({
      title: "Sucesso",
      description: "Dados da comunidade atualizados com sucesso.",
      color: "success",
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const { handleChange, handleSubmit, values, setFieldValue } =
    useFormik<UpdateCommunity>({
      initialValues: {
        description: community.description,
        image: community.image,
        name: community.name,
        tags: community.tags,
      },
      onSubmit: handleEditSubmit,
    });

  if (sessionRole === "OWNER") {
    return (
      <>
        <Button
          color="default"
          startContent={<FaEdit />}
          onPress={handleEditButton}
        >
          Editar
        </Button>
        <Modal
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Editar Comunidade
                </ModalHeader>
                <ModalBody>
                  <Form>
                    <div className="flex gap-4 items-center w-full">
                      <Avatar
                        isBordered
                        className="min-w-24 min-h-24"
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
                    <Select
                      aria-label="Tags da comunidade"
                      classNames={{
                        trigger: "min-h-12 py-2",
                      }}
                      defaultSelectedKeys={values.tags}
                      isMultiline={true}
                      label="Tags da comunidade"
                      name="tags"
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
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={() => handleSubmit()}>
                    Salvar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (!isMember) {
    return (
      <Button color="primary" isLoading={loading} onPress={handleJoinButton}>
        Participar
      </Button>
    );
  }

  return (
    <Button color="danger" isLoading={loading} onPress={handleLeaveButton}>
      Sair
    </Button>
  );
}
