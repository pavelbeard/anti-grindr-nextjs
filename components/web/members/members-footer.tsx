"use client";

import { useState } from "react";
import TreeIcon from "@/public/ui-icons/tree-zinc-800.png";
import EyesIcon from "@/public/ui-icons/eyes-zinc-800.svg";
import ChatIcon from "@/public/ui-icons/chat-zinc-800.png";
import TreeIconHover from "@/public/ui-icons/tree-zinc-800-amber-800.png";
import EyesIconHover from "@/public/ui-icons/eyes-zinc-800-white-green-500-black.svg";
import ChatIconHover from "@/public/ui-icons/chat-zinc-800-blue-500.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MembersFooter() {
  const pathname = usePathname();

  const icons = [
    { src: TreeIcon.src, alt: "grid", href: "/members" },
    { src: EyesIcon.src, alt: "gazes", href: "/members/gazes" },
    { src: ChatIcon.src, alt: "chats", href: "/members/chats" },
  ];

  const hoverIcons = [
    { src: TreeIconHover.src, alt: "grid" },
    { src: EyesIconHover.src, alt: "gazes" },
    { src: ChatIconHover.src, alt: "chats" },
  ];

  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIcon(index);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <footer className="w-full bg-black h-24 p-4 text-center border-t border-zinc-700">
      <div className="flex justify-center items-center space-x-32">
        {/* ICONS: MEMBERS, GAZES, MESSAGES  */}
        {icons.map((icon, index) => (
          <Link href={icon.href} key={index}>
            <img
              src={
                index === hoveredIcon
                  ? hoverIcons[index].src
                  : pathname === icon.href
                    ? hoverIcons[index].src
                    : icon.src
              }
              alt={icon.alt}
              className="size-12"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
            />
          </Link>
        ))}
      </div>
    </footer>
  );
}
