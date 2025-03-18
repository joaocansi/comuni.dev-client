"use client";

import { User } from "better-auth/types";
import { createContext, ReactNode, useContext } from "react";

type Session = {
  user: User | null;
};

type SessionProviderProps = {
  children: ReactNode;
  user: User | null;
};

const SessionContext = createContext({} as Session);

export const SessionProvider = ({ children, user }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
