"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { AuthButtons } from "./AuthButtons";
import { UserMenuMobile } from "./UserMenuMobile";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common.header");
  const { token } = useAuth();

  const navItems = [
    { label: t("nav.features"), href: "/features" },
    { label: t("nav.about"), href: "/about-us" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.contact"), href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const cleanPath = pathname.replace(/^\/(en|ar)/, "") || "/";
      return cleanPath === "/";
    }
    return pathname.includes(href.replace(/^\//, ""));
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold gradient-text">Kamalfy</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium text-sm ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {token && <UserDropdown />}
              <LanguageSwitcher />
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border pb-4">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {token ? (
                <UserDropdown />
              ) : (
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
