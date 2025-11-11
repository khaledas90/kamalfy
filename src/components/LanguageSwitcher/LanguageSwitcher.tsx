"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    router.refresh();
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={toggleLanguage}>
        {currentLocale === "en" ? "عربي" : "English"}
      </Button>
    </>
  );
}
