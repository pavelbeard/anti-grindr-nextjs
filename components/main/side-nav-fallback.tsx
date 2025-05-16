import Link from "next/link";
import { headers } from "next/headers";
import clsx from "clsx";
import Facebook from "../svg/social/facebook";
import XformerlyTwitter from "../svg/social/x";
import Instagram from "../svg/social/instagram";

export default async function SideNavFallback() {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  const links = [
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
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
