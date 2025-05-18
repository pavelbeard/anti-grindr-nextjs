"use client";

import { useState } from "react";
import TreeIcon from "@/public/ui-icons/tree-zinc-800.png";
import EyesIcon from "@/public/ui-icons/eyes-zinc-800.svg";
import ChatIcon from "@/public/ui-icons/chat-zinc-800.png";
import TreeIconHover from "@/public/ui-icons/tree-zinc-800-amber-800.png";
import EyesIconHover from "@/public/ui-icons/eyes-zinc-800-white-green-500-black.svg";
import ChatIconHover from "@/public/ui-icons/chat-zinc-800-blue-500.png";

export default function IconsSet() {
  const icons = [
    { src: TreeIcon.src, alt: "Tree Icon" },
    { src: EyesIcon.src, alt: "Eyes Icon" },
    { src: ChatIcon.src, alt: "Chat Icon" },
  ];

  const hoverIcons = [
    { src: TreeIconHover.src, alt: "Tree Icon" },
    { src: EyesIconHover.src, alt: "Eyes Icon" },
    { src: ChatIconHover.src, alt: "Chat Icon" },
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
        <img
          key={index}
          src={index === hoveredIcon ? hoverIcons[index].src : icon.src}
          alt={icon.alt}
          className="size-20"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
        />
      ))}
    </div>
  );
}
