"use client";

import { addToast, Button } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

import { CommunityUpdateModal } from "./modals/community-update.modal";

import { joinCommunity } from "@/src/app/_actions/join-community.action";
import { Community } from "@/src/app/_actions/get-community.action";
import { useCommunity } from "@/src/shared/hooks/community.hook";
import { leaveCommunity } from "@/src/app/_actions/leave-community.action";

type CommunityHeaderButtonsProps = {
  community: Community;
};

export function CommunityHeaderButtons({
  community,
}: CommunityHeaderButtonsProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);

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
    setOpen(true);
  };

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
        <CommunityUpdateModal isOpen={isOpen} setOpen={setOpen} />
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
