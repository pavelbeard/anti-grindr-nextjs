import React from "react";
import LoadingSpinner from "../svg/staff/loading-spinner";

export default function LoadingInfScroll({
  text = "Loading...",
}: {
  text?: string;
}) {
  // This component can be used to show a loading state for infinite scroll
  return (
    <div className="fixed bottom-32 place-self-center flex items-center justify-center px-2 py-1 h-12 w-64 text-white bg-zinc-700 rounded-lg">
      <LoadingSpinner text={text} />
    </div>
  );
}
