"use client";

import { EventsTab } from "./tabs/community-events-tab";
import { SocialMediaTab } from "./tabs/community-social-media-tab";

import { Tabs } from "@/src/components/tabs";

export function CommunityNavigation() {
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
        },
      ]}
    />
  );
}
