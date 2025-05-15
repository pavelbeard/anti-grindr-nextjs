import Link from "next/link";
import { headers } from "next/headers";

import "@/components/landing/style.css";
import clsx from "clsx";

export default async function SideNavFallback() {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  const links = [
    { href: "/", label: "download" },
    { href: "/about", label: "about" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
  ];
  const activeLink = links.find((link) => link.href === pathname);

  return (
    <nav className="sideNavLinks">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx("sideNavLink", { active: link === activeLink })}
        >
          <div className="sideNavLinkPadding">{link.label}</div>
        </Link>
      ))}
    </nav>
  );
}
