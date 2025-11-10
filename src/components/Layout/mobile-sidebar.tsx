"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronDown, Search } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import useAppStore from "@/store/store";

export default function MobileSidebar() {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const pathname = usePathname();
  const { setOpen } = useSidebar();
  const router = useRouter();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    useAppStore.getState().setSearchQuery(e.target.value);
    if (!window.location.pathname.startsWith("/blogs")) {
      router.push("/blogs");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold">물개머니</h2>
        <p className="text-sm text-gray-400">금융 정보 블로그</p>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-4">
          <div className="relative px-3">
            <Search
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-black border border-gray-100 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
              value={useAppStore((state) => state.searchQuery)}
              onChange={handleSearch}
            />
          </div>

          <div className="space-y-1">
            <div className="space-y-1">
              <button
                onClick={() => setIsServiceOpen(!isServiceOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                  isActive("/")
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isServiceOpen ? "bg-yellow-500" : "bg-gray-500"
                    )}
                  ></span>
                  <Link
                    href="/"
                    className="hover:text-white"
                    onClick={handleLinkClick}
                  >
                    소액결제 현금화
                  </Link>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isServiceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isServiceOpen && (
                <div className="pl-8 space-y-1 border-l border-gray-700 ml-2">
                  <SidebarItem asChild>
                    <Link
                      href="/리니지-다이아-매입하는-곳-드디어-찾았네요-고객후"
                      className={cn(
                        "text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center gap-2",
                        isActive(
                          "/리니지-다이아-매입하는-곳-드디어-찾았네요-고객후"
                        ) && "text-white font-bold bg-gray-800/50"
                      )}
                      onClick={handleLinkClick}
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                      리니지 현금화 정보
                    </Link>
                  </SidebarItem>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setIsCardOpen(!isCardOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                  isActive("/정보이용료-현금화")
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isCardOpen ? "bg-yellow-500" : "bg-gray-500"
                    )}
                  ></span>
                  <Link
                    href="/정보이용료-현금화"
                    className="hover:text-white"
                    onClick={handleLinkClick}
                  >
                    정보이용료 현금화
                  </Link>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isCardOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCardOpen && (
                <div className="pl-8 space-y-1 border-l border-gray-700 ml-2">
                  <SidebarItem asChild>
                    <Link
                      href="/정보이용료-현금화/한게임-포커-머니상-안전한-거래-방법과-주의사항"
                      className={cn(
                        "text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center gap-2",
                        isActive(
                          "/정보이용료-현금화/한게임-포커-머니상-안전한-거래-방법과-주의사항"
                        ) && "text-white font-bold bg-gray-800/50"
                      )}
                      onClick={handleLinkClick}
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                      한게임 포커 머니상
                    </Link>
                  </SidebarItem>
                </div>
              )}
            </div>

            <SidebarItem asChild>
              <Link
                href="/신용카드현금화"
                className={cn(
                  "text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center gap-2",
                  isActive("/신용카드현금화") && "text-white font-bold"
                )}
                onClick={handleLinkClick}
              >
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                신용카드 현금화
              </Link>
            </SidebarItem>

            <SidebarItem asChild>
              <Link
                href="/blogs"
                className={cn(
                  "text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center gap-2",
                  isActive("/blogs") && "text-white font-bold"
                )}
                onClick={handleLinkClick}
              >
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                블로그
              </Link>
            </SidebarItem>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
