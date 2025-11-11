"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Drawer from "./_components/Layout/Drawer";
import SignalToast from "@/components/others/SignalToast";
import { AnimatePresence } from "framer-motion";
import { NotificationData } from "@/lib/ToastType";
import Header from "./_components/Layout/Header";

interface ClientProps {
  children: React.ReactNode;
  screens: null;
}

export default function Client({ children, screens }: ClientProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const pathname = usePathname();
  const handleMobileNavToggle = (): void =>
    setIsMobileNavOpen(!isMobileNavOpen);

  const handleSidebarToggle = (): void =>
    setIsSidebarCollapsed(!isSidebarCollapsed);

  const language = pathname.split("/")[1] || "en";
  const isRTL = language === "ar";

  useEffect(() => {
    if (notifications.length === 0) return;

    const timer = setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notifications]);

  // Mock connection status for now
  const isConnected = true;
  console.log("isConnected", isConnected);

  return (
    // <PermissionsProvider
    //   permissions={screens? as unknown as Screens | null}
    //   isLoading={screens === null}
    // >
    <div className={`flex h-screen flex-col`}>
      <Header
        isMobileNavOpen={isMobileNavOpen}
        onMobileNavToggle={handleMobileNavToggle}
        isRTL={isRTL}
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`hidden lg:block lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-x-hidden ${
            isSidebarCollapsed ? "lg:w-16" : "lg:w-[270px]"
          }`}
        >
          <Drawer
            currentPath={pathname}
            isRTL={isRTL}
            isCollapsed={isSidebarCollapsed}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <SignalToast
              key={`${index}-${notification.title}`}
              notification={notification}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
    // </PermissionsProvider>
  );
}
