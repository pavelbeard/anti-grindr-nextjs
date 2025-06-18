import React from "react";

/**
 * Wrapper component for consistent styling for Members section.
 * @param param0 - The children to be wrapped inside the section.
 * @returns 
 */
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-y-auto flex-1 flex flex-col items-center place-self-center min-w-[600px] px-0.25">
      {children}
    </main>
  );
}
