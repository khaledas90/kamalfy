"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  title: string ;
  path: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

const PageHeader = ({breadcrumbs}: PageHeaderProps) => {

  return (
    <div className="mb-3 flex flex-col gap-3 pt-2">
      <nav
        aria-label="breadcrumbs"
        className="flex items-center space-x-1 text-sm"
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={item.title}>
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}

              {isLast ? (
                <span className="text-[0.9rem] font-medium text-foreground">
                  {item.title as string}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={cn(
                    "text-[0.9rem] font-semibold hover:underline",
                    "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  {item.title as string}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default PageHeader;
