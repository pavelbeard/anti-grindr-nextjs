import { chivoBold } from "@/app/fonts";
import GreenderLogoTransparent from "@/public/greender-logo-new.webp";
import clsx from "clsx";

export default function GreenderLogo() {
  return (
    <header className="flex items-end justify-center p-2">
      <img
        src={GreenderLogoTransparent.src}
        className="size-10"
        alt="Greender Logo"
      />
      <h1 className={clsx("text-3xl text-white", chivoBold.className)}>Greender</h1>
      <div className="ml-2 mb-1.5 px-2 py-0.5 text-xs text-black bg-[#4A9D5B] rounded-full">
        alfa
      </div>
    </header>
  );
}
