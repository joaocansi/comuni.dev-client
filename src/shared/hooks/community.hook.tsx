"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { useSession } from "./session.hook";

import {
  Community,
  getCommunity,
} from "@/src/app/_actions/get-community.action";

type SessionRole = "" | "DEFAULT" | "OWNER";

type CommunityContext = {
  refreshCommunity: () => Promise<void>;
  community: Community;
  sessionRole: SessionRole;
};

type CommunityProviderProps = {
  children: ReactNode;
  community: Community;
};

const CommunityContext = createContext({} as CommunityContext);

export const CommunityProvider = ({
  children,
  community,
}: CommunityProviderProps) => {
  const [communityState, setCommunityState] = useState(community);
  const { user } = useSession();
  let sessionRole: SessionRole = "";

  if (user) {
    if (user.id === communityState.owner.id) {
      sessionRole = "OWNER";
    } else if (user.id === communityState.sessionUser) {
      sessionRole = "DEFAULT";
    }
  }

  const refreshCommunity = async () => {
    const { data } = await getCommunity(communityState.slug);

    if (data) setCommunityState(data);
  };

  return (
    <CommunityContext.Provider
      value={{
        community: communityState,
        sessionRole,
        refreshCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);
