"use client";

import { Tooltip } from "@heroui/tooltip";
import { Tab, Tabs as NextUITabs, TabsProps } from "@heroui/tabs";
import { FaLock } from "react-icons/fa";

export function Tabs(
  props: TabsProps & {
    tabs: Array<{
      title: React.ReactNode;
      key: string;
      children: React.ReactNode;
      isLocked?: boolean;
    }>;
  },
) {
  return (
    <NextUITabs {...props}>
      {props.tabs.map((tab) => (
        <Tab
          key={tab.key}
          isDisabled={tab.isLocked}
          title={
            tab.isLocked ? (
              <Tooltip content="Precisa ser membro da comunidade.">
                <div className="flex items-center space-x-2">
                  <FaLock />
                  <span>{tab.title}</span>
                </div>
              </Tooltip>
            ) : (
              tab.title
            )
          }
        >
          {tab.children}
        </Tab>
      ))}
    </NextUITabs>
  );
}
