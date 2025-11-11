"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Screens, ScreenName } from "@/store/api/user/user";

interface ScreenPermission {
  canAdd: boolean;
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface ScreensPermissionsContextType {
  permissions: Screens | null;
  isLoading: boolean;
  can: (screen: ScreenName, action: keyof ScreenPermission) => boolean;
}

const ScreensPermissionsContext = createContext<ScreensPermissionsContextType | undefined>(undefined);

interface PermissionsProviderProps {
  children: ReactNode;
  permissions: Screens | null;
  isLoading: boolean;
}

export function PermissionsProvider({ children, permissions, isLoading }: PermissionsProviderProps) {
  const can = (screen: ScreenName, action: keyof ScreenPermission): boolean => {
    if (!permissions || !permissions[screen]) {
      return false;
    }
    return permissions[screen][action];
  };

  return (
    <ScreensPermissionsContext.Provider value={{ permissions, isLoading, can }}>
      {children}
    </ScreensPermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(ScreensPermissionsContext);
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
}

export type { Screens, ScreenName };
