"use client";

import {
  ArrowLeftIcon,
  NoSymbolIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Controls() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <button className="btn btn-secondary" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-8 text-zinc-400" />
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
