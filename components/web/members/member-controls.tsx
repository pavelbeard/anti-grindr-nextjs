"use client";

import { NoSymbolIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ControlsProps {
  closeModal: () => void;
}

export default function Controls({ closeModal }: ControlsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer" onClick={() => closeModal()}>
          <XMarkIcon className="size-8 text-zinc-400" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn btn-tertiary">
          <StarIcon className="size-8 text-green-400" />
        </button>
        <button className="btn btn-danger">
          <NoSymbolIcon className="size-8 text-red-400" />
        </button>
      </div>
    </div>
  );
}
