"use client";

import { Avatar as HeroUIAvatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";

import { authClient } from "../clients/auth-client";

type AvatarProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export const Avatar = ({ user }: AvatarProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <HeroUIAvatar
          isBordered
          as="button"
          color="primary"
          name={user.name}
          size="sm"
          src={user.image}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2"
          textValue={user.email}
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Profile</DropdownItem>
        <DropdownItem key="team_settings">My Projects</DropdownItem>
        <DropdownItem key="analytics">My Communities</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={handleSignOut}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
