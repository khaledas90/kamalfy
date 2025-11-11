"use client";

import Link from "next/link";
import { useAllRoutes } from "./ItemLinks";
import {
  usePermissions,
} from "@/components/permissions/ScreensPermissionsContext";
import { ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Tooltip } from "@heroui/react";

type RouteType = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: RouteType[];
};

interface DrawerProps {
  currentPath: string;
  isRTL?: boolean;
  isCollapsed?: boolean;
}

export default function Drawer({ currentPath, isRTL = false, isCollapsed = false }: DrawerProps) {
  const { } = usePermissions();
  const routes = useAllRoutes();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Load expanded items from localStorage on component mount
  useEffect(() => {
    const savedExpandedItems = localStorage.getItem('sidebar-expanded-items');
    if (savedExpandedItems) {
      try {
        const parsedItems = JSON.parse(savedExpandedItems);
        setExpandedItems(parsedItems);
      } catch (error) {
        console.error('Error parsing saved expanded items:', error);
      }
    }
  }, []);

  // Save expanded items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebar-expanded-items', JSON.stringify(expandedItems));
  }, [expandedItems]);

  // Initialize GSAP animations and restore expanded state
  useEffect(() => {
    // Set initial state for all dropdowns
    const currentRefs = dropdownRefs.current;
    
    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      Object.entries(currentRefs).forEach(([label, element]) => {
        if (element) {
          const isExpanded = expandedItems.includes(label);
          if (isExpanded) {
            // Set to expanded state immediately
            gsap.set(element, { height: "auto", opacity: 1 });
          } else {
            // Set to collapsed state
            gsap.set(element, { height: 0, opacity: 0 });
          }
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      // Cleanup GSAP animations on unmount
      gsap.killTweensOf(Object.values(currentRefs));
    };
  }, [expandedItems]);
  
  const isActive = (href?: string): boolean => {
    if (!href) return false;
    const basePath = currentPath.split("/").slice(2).join("/") || "";
    return `/${basePath}` === href;
  };

  const toggleExpand = (label: string) => {
    const dropdownElement = dropdownRefs.current[label];
    const isCurrentlyExpanded = expandedItems.includes(label);
    
    if (isCurrentlyExpanded) {
      // Collapse animation
      gsap.to(dropdownElement, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setExpandedItems(prev => prev.filter(item => item !== label));
        }
      });
    } else {
      // Expand animation
      setExpandedItems(prev => [...prev, label]);
      
      // Use a small delay to ensure the DOM is updated
      setTimeout(() => {
        if (dropdownElement) {
          // Set initial state
          gsap.set(dropdownElement, { height: 0, opacity: 0 });
          
          // Get the natural height
          const naturalHeight = dropdownElement.scrollHeight;
          
          // Animate to natural height with stagger for children
          gsap.fromTo(dropdownElement, 
            { height: 0, opacity: 0 },
            { 
              height: naturalHeight, 
              opacity: 1, 
              duration: 0.4, 
              ease: "power2.out",
              onComplete: () => {
                gsap.set(dropdownElement, { height: "auto" });
              }
            }
          );

          // Animate children with stagger
          const children = dropdownElement.querySelectorAll('.menu-item');
          gsap.fromTo(children, 
            { y: -10, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.3, 
              stagger: 0.05,
              ease: "power2.out",
              delay: 0.1
            }
          );
        }
      }, 10);
    }
  };

  const renderMenuItem = (route: RouteType, level = 0) => {
    const hasChildren = route.children && route.children.length > 0;
    const isExpanded = expandedItems.includes(route.label);
    const active = isActive(route.href);
    const shouldShow = true; // Always show for testing

    if (!shouldShow) {
      return null;
    }

    const paddingInlineStart = isCollapsed ? "12px" : `${12 + level * 16}px`;
    const tooltipPlacement = isRTL ? "left" : "right";

    if (hasChildren) {
      const buttonElement = (
        <button
          onClick={() => !isCollapsed && toggleExpand(route.label)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors overflow-hidden ${
            level === 0 ? "font-medium" : ""
          } ${
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          } ${isCollapsed ? "justify-center sidebar-tooltip" : ""}`}
          style={{ paddingInlineStart }}
        >
          <div className="flex items-center gap-2">
            <span className="me-2">{route.icon}</span>
            {!isCollapsed && <span>{route.label}</span>}
          </div>
          {!isCollapsed && (
            <div 
              className="transition-transform duration-300 ease-in-out"
              style={{ 
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transformOrigin: 'center'
              }}
            >
              <ChevronRight className="h-4 w-4 ltr:rotate-0 rtl:-rotate-180" />
            </div>
          )}
        </button>
      );

      return (
        <div key={route.label} className="menu-item overflow-hidden">
          {isCollapsed ? (
            <Tooltip 
              content={route.label} 
              placement={tooltipPlacement}
              color="primary"
              className="rounded-full"
            >
              {buttonElement}
            </Tooltip>
          ) : (
            buttonElement
          )}
          {!isCollapsed && (
            <div 
              ref={(el) => {
                dropdownRefs.current[route.label] = el;
              }}
              className="overflow-hidden"
              style={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            >
              <div className="mt-1 space-y-1">
                {route.children?.map((child: RouteType) => renderMenuItem(child, level + 1))}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      const linkElement = (
        <Link
          href={route.href || "#"}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors overflow-hidden ${
            level === 0 ? "font-medium" : ""
          } ${
            active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          } ${isCollapsed ? "justify-center sidebar-tooltip" : ""}`}
          style={{ paddingInlineStart }}
        >
          <span className="me-2">{route.icon}</span>
          {!isCollapsed && <span>{route.label}</span>}
        </Link>
      );

      return (
        <div key={route.label} className="menu-item overflow-hidden">
          {isCollapsed ? (
            <Tooltip 
              content={route.label} 
              placement={tooltipPlacement}
              color="primary"
              className="rounded-full"
            >
              {linkElement}
            </Tooltip>
          ) : (
            linkElement
          )}
        </div>
      );
    }
  };

  return (
    <div className={`h-full rtl:border-l ltr:border-r ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <aside className="w-full bg-background overflow-x-hidden">
        <nav 
          className={`grid gap-2 text-sm max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden sidebar-scrollbar transition-all duration-300 ${
            isCollapsed ? "p-2" : "p-4"
          }`}
        >
          {routes.map((route) => renderMenuItem(route))}
        </nav>
      </aside>
    </div>
  );
}
