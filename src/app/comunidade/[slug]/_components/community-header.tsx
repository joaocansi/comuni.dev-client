"use client";

import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

import { CommunityUpdateModal } from "./modals/community-update.modal";

import { useCommunity } from "@/src/shared/hooks/community.hook";

export function CommunityHeader() {
  const { community, isOwner } = useCommunity();
  const [isOpen, setOpen] = useState(false);

  const renderTagChip = (tag: string) => {
    return <Chip key={`page-${community.slug}-tag-${tag}`}>{tag}</Chip>;
  };

  return (
    <div className="flex gap-8 items-center flex-wrap">
      <Avatar isBordered className="min-w-52 min-h-52" src={community.image} />
      <div className="flex gap-2 flex-col">
        <h2 className="text-4xl font-black">{community.name}</h2>
        <div className="flex gap-1 flex-wrap">
          <Chip color="primary">{community.totalMembers} Membros</Chip>
          {community.tags.map(renderTagChip)}
        </div>
        <p>{community.description}</p>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              color="default"
              startContent={<FaEdit />}
              onPress={() => setOpen(true)}
            >
              Editar
            </Button>
            <CommunityUpdateModal isOpen={isOpen} setOpen={setOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
