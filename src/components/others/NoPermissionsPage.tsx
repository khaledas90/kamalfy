import Link from "next/link";
import { LockKeyhole, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import BtnGoBack from "./BtnGoBack";
export default function NoPermissionPage() {
  const t = useTranslations("Dashboard.NoPermission");
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-12">
          <div className="space-y-6 max-w-md text-center md:text-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("Access Restricted")}
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t(
                  "You do not have permission to access this area This section requires special access privileges"
                )}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t(
                  "If you believe this is an error, please contact your gym administrator or support team"
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start px-4 md:px-0">
                <BtnGoBack />
                <Button variant="outline" asChild>
                  <Link href="/contact">{t("Contact Support")}</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center rounded-full bg-muted/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-muted-foreground/20 animate-pulse" />
              <div className="relative bg-background rounded-full p-8 shadow-lg">
                <ShieldAlert className="h-24 w-24 md:h-32 md:w-32 text-primary" />
              </div>
              <div className="absolute top-1/4 end-1/4 animate-bounce">
                <div className="relative bg-background rounded-full p-3 shadow-lg">
                  <LockKeyhole className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
