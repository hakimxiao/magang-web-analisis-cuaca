"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

/* === REACT ICONS === */
import { FaMapMarkedAlt, FaCloudSun, FaWaveSquare  } from "react-icons/fa";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    icon?: React.ReactNode;
  }[];
};

/* =========================
   MENU UTAMA
========================= */
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Layanan Cuaca & Gempa",
    subItems: [
      {
        name: "Peta Interaktiv",
        path: "/peta",
        icon: <FaMapMarkedAlt size={14} />,
      },
      {
        name: "Prakiraan Cuaca",
        path: "/",
        icon: <FaCloudSun size={14} />,
      },
      {
        name: "Peta Aktivitas Gempa",
        path: "/gempa",
        icon: <FaWaveSquare  size={14} />,
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  /* =========================
     AUTO OPEN SUBMENU
  ========================= */
  useEffect(() => {
    let matched = false;

    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu({ index });
          matched = true;
        }
      });
    });

    if (!matched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) =>
      prev?.index === index ? null : { index }
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen border-r bg-white dark:bg-gray-900 transition-all duration-300
        ${
          isExpanded || isMobileOpen || isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LOGO */}
      <div className="py-8 flex justify-center">
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={230}
                height={60}
                className="dark:hidden"
              />
              <Image
                src="/images/logo/logo-dark.png"
                alt="Logo"
                width={230}
                height={60}
                className="hidden dark:block"
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* MENU */}
      <nav className="px-5">
        <h2 className="mb-4 text-xs uppercase text-gray-400 flex justify-center">
          {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
        </h2>

        <ul className="flex flex-col gap-4">
          {navItems.map((nav, index) => (
            <li key={nav.name}>
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`menu-item group cursor-pointer ${
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span className="menu-item-icon-inactive">
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="menu-item-text">{nav.name}</span>
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform ${
                        openSubmenu?.index === index ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>

              {(isExpanded || isHovered || isMobileOpen) && nav.subItems && (
<div
  ref={(el) => {
    subMenuRefs.current[`main-${index}`] = el;
  }}
  className="overflow-hidden transition-all duration-300"
  style={{
    height:
      openSubmenu?.index === index
        ? `${subMenuHeight[`main-${index}`]}px`
        : "0px",
  }}
>
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.path}
                          className={`menu-dropdown-item flex items-center gap-3 ${
                            isActive(sub.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          <span className="text-gray-500">
                            {sub.icon}
                          </span>
                          <span>{sub.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
    </aside>
  );
};

export default AppSidebar;
