"use client";

import Link from "next/link";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import "@/components/main/style.css";

export default function SideNav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "download" },
    { href: "/about", label: "about" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];
  const activeLink = links.find((link) => link.href === pathname);
  const activeLinkClass = activeLink ? "active" : "";

  useEffect(() => {
    if (navRef.current) {
      const links = navRef.current.querySelectorAll(".sideNavLink");

      links.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (linkPath === pathname) {
          link.classList.add("active");
        }

        link.addEventListener("mouseenter", () => {
          link.classList.add("active");
        });
        link.addEventListener("mouseleave", () => {
          if (linkPath !== pathname) {
            link.classList.remove("active");
          }
        });
      });
    }
  }, []);

  return (
    <nav ref={navRef} className="sideNavLinks">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx("sideNavLink", {
            [activeLinkClass]: link === activeLink,
          })}
        >
          <div className="sideNavLinkPadding">{link.label}</div>
        </Link>
      ))}
    </nav>
  );
}
