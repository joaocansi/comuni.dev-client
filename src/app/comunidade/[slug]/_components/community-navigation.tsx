"use client";

import { EventsTab } from "./tabs/community-events-tab";
import { ProjectsTab } from "./tabs/community-projects-tab";
import { SocialMediaTab } from "./tabs/community-social-media-tab";

import { useCommunity } from "@/src/shared/hooks/community.hook";
import { Tabs } from "@/src/shared/components/tabs";

export function CommunityNavigation() {
  const { sessionRole } = useCommunity();
  const isMember = sessionRole !== "";

  return (
    <Tabs
      color="primary"
      tabs={[
        {
          title: "Redes Sociais",
          key: "socialmedia",
          children: <SocialMediaTab />,
        },
        {
          title: "Eventos",
          key: "eventos",
          children: <EventsTab />,
          isLocked: !isMember,
        },
        {
          title: "Projetos",
          key: "projetos",
          children: <ProjectsTab />,
          isLocked: !isMember,
        },
      ]}
    />
  );
}
