import React from "react";

/**
 * Wrapper component for consistent styling for Members section.
 * @param param0 - The children to be wrapped inside the section.
 * @returns 
 */
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="overflow-y-auto flex flex-col items-center place-self-center h-full min-w-[600px] px-0.25">
      {children}
    </section>
  );
}
