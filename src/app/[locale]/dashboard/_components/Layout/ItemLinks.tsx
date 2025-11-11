"use client";

import { BarChart3, Menu } from "lucide-react";
import { ReactElement } from "react";

interface Route {
  href?: string;
  label: string;
  icon: ReactElement;
  permissionId?: string;
  children?: Route[];
}

export function useAllRoutes(): Route[] {

  return [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];
}

export const menuIcon = <Menu className="h-5 w-5" />;
