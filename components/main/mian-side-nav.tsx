"use client";

import Link from "next/link";

import { cloneElement, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Facebook from "../svg/social/facebook";
import XformerlyTwitter from "../svg/social/x";
import Instagram from "../svg/social/instagram";

export default function SideNav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const primaryLinks = [
    { href: "/", label: "download" },
    { href: "/about", label: "about" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];

  const secondaryLinks = [
    { href: "/terms", label: "terms" },
    { href: "/privacy-policy", label: "privacy policy" },
    { href: "/cookies", label: "cookies" },
    { href: "/community-guidelines", label: "community guidelines" },
  ];

  const socialLinks = [
    { href: "/facebook", label: <Facebook /> },
    { href: "/twitter", label: <XformerlyTwitter /> },
    { href: "/instagram", label: <Instagram /> },
  ];

  return (
    <nav ref={navRef} className="sideNavLinks">
      <div className="sideNavPrimaryLinks">
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx("sideNavLink", {
              active: hoveredHref === link.href || pathname === link.href,
            })}
            onMouseEnter={() => setHoveredHref(link.href)}
            onMouseLeave={() => setHoveredHref(null)}
          >
            <div className="sideNavLinkPadding">{link.label}</div>
          </Link>
        ))}
      </div>

      <div className="sideNavSecondaryLinks">
        {secondaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="sideNavSecondaryLink"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="socialLinks">
        <div className="followUs">Follow us</div>
        <div aria-label="Social Links">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="sideNavSocialLink"
            >
              {cloneElement(link.label, { className: "size-6" })}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
