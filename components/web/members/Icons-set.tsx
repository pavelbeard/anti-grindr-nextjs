"use client";

import { useState } from "react";
import TreeIcon from "@/public/ui-icons/tree-zinc-800.png";
import EyesIcon from "@/public/ui-icons/eyes-zinc-800.svg";
import ChatIcon from "@/public/ui-icons/chat-zinc-800.png";
import TreeIconHover from "@/public/ui-icons/tree-zinc-800-amber-800.png";
import EyesIconHover from "@/public/ui-icons/eyes-zinc-800-white-green-500-black.svg";
import ChatIconHover from "@/public/ui-icons/chat-zinc-800-blue-500.png";
import { useTab } from "@/lib/stores/tabs-store";
import Link from "next/link";

export default function IconsSet() {
  const { tab, setTab } = useTab();

  const icons = [
    { src: TreeIcon.src, alt: "grid" },
    { src: EyesIcon.src, alt: "gazes" },
    { src: ChatIcon.src, alt: "chats" },
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
    <div className="flex justify-center items-center space-x-32">
      {/* ICONS: MEMBERS, GAZES, MESSAGES  */}
      {icons.map((icon, index) => (
        <Link href={`#${icon.alt}`} key={index}>
          <img
            src={
              index === hoveredIcon
                ? hoverIcons[index].src
                : tab === icon.alt
                  ? hoverIcons[index].src
                  : icon.src
            }
            alt={icon.alt}
            className="size-12"
            onClick={() => setTab(icon.alt)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          />
        </Link>
      ))}
    </div>
  );
}
