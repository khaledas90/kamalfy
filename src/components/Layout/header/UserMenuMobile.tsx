"use client";

import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/store/queries/useAuth";

interface UserMenuMobileProps {
  onItemClick?: () => void;
}

export function UserMenuMobile({ onItemClick }: UserMenuMobileProps) {
  const { merchant } = useAuth();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    onItemClick?.();
  };

  return (
    <>
      <Link href="/dashboard" onClick={onItemClick}>
        <Button
          size="sm"
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </Link>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="px-2 py-1">
          <p className="text-sm font-medium">{merchant?.name}</p>
          <p className="text-xs text-muted-foreground">{merchant?.email}</p>
        </div>
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary transition-colors text-sm"
          onClick={onItemClick}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary transition-colors text-sm"
          onClick={onItemClick}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-sm w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );
}

