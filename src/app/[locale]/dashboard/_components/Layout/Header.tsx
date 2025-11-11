"use client";

import { Menu, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { UserMenu } from "./UserMenu";
import { useAllRoutes } from "./ItemLinks";
// import {usePermissions} from "@/components/permissions/ScreensPermissionsContext";
import { useState, useEffect } from "react";

type RouteType = {
  label: string;
  href?: string;
  icon: React.ReactElement;
  permissionId?: string;
  children?: RouteType[];
};

interface Props {
  isMobileNavOpen?: boolean;
  onMobileNavToggle?: () => void;
  isRTL?: boolean;
  isSidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export default function Header({
  isMobileNavOpen = false,
  onMobileNavToggle = () => { },
  isRTL = false,
  isSidebarCollapsed = true,
  onSidebarToggle = () => { },
}: Props) {
  // const { can } = usePermissions();
  const routes = useAllRoutes();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  // Reset expanded items when mobile nav closes
  useEffect(() => {
    if (!isMobileNavOpen) {
      setExpandedItems([]);
    }
  }, [isMobileNavOpen]);

  const isActive = (href?: string): boolean => {
    if (!href) return false;
    if (typeof window === "undefined") return false;
    const basePath = window.location.pathname.split("/").slice(2).join("/") || "";
    return `/${basePath}` === href;
  };

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const renderMobileMenuItem = (route: RouteType, level = 0) => {
    const hasChildren = route.children && route.children.length > 0;
    const isExpanded = expandedItems.includes(route.label);
    const active = isActive(route.href);
    // const alwaysVisible = route.label === "Settings" || route.label === "Dashboard";

    // Temporarily show all items for testing
    // if (!alwaysVisible && !can(route.label as ScreenName, "canView")) {
    //   return null;
    // }

    const paddingInlineStart = `${12 + level * 16}px`;

    if (hasChildren) {
      return (
        <div key={route.label} className="mobile-menu-item">
          <button
            onClick={() => toggleExpand(route.label)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              level === 0 ? "font-medium" : ""
            } ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
            style={{ paddingInlineStart }}
          >
            <div className="flex items-center gap-2">
              <span className="me-2">{route.icon}</span>
              <span>{route.label}</span>
            </div>
            <div 
              className="transition-transform duration-300 ease-in-out"
              style={{ 
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transformOrigin: 'center'
              }}
            >
              <ChevronRight className="h-4 w-4 ltr:rotate-0 rtl:-rotate-180" />
            </div>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1 space-y-1">
              {route.children?.map((child: RouteType) => renderMobileMenuItem(child, level + 1))}
            </div>
          </div>
        </div>
      );
    } else {
      const localizedHref = `/${isRTL ? "ar" : "en"}${route.href}`;
      return (
        <Link
          key={route.label}
          href={localizedHref}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
            level === 0 ? "font-medium" : ""
          } ${
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
          style={{ paddingInlineStart }}
          onClick={() => onMobileNavToggle()}
        >
          <span className="me-2">{route.icon}</span>
          <span>{route.label}</span>
        </Link>
      );
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 lg:px-6">
      <Sheet open={isMobileNavOpen} onOpenChange={onMobileNavToggle}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isRTL ? "right" : "left"}
          className="w-72 overflow-y-auto sm:max-w-none"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <nav className="flex flex-col gap-2">
            <Link
              href={`/${isRTL ? "ar" : "en"}`}
              className="flex justify-center items-center gap-2 mb-3 text-lg font-semibold"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold gradient-text">Kamalfy</span>
              </div>
            </Link>
            {routes.map((route) => renderMobileMenuItem(route))}
          </nav>
        </SheetContent>
      </Sheet>

      <Link
        href={`/${isRTL ? "ar" : "en"}`}
        className="flex items-center gap-2 lg:hidden"
      >
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold gradient-text">Kamalfy</span>
        </div>
      </Link>
      <Link
        href={`/${isRTL ? "ar" : "en"}`}
        className="hidden items-center gap-2 lg:flex"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold gradient-text">Kamalfy</span>
        </div>
      </Link>

      {/* Desktop Sidebar Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onSidebarToggle}
        className="hidden lg:flex hover:bg-primary transition-all duration-200"
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? (
          <PanelLeftOpen className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <PanelLeftClose className="h-4 w-4 transition-transform duration-200" />
        )}
        <span className="sr-only">
          {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        </span>
      </Button>

      <div className="rtl:mr-auto ltr:ml-auto flex items-center gap-2">
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
