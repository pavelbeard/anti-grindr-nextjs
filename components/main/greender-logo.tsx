import { chivo, chivoBold } from "@/app/fonts";
import GreenderLogoTransparent from "@/public/greender-logo-black.webp";
import clsx from "clsx";

export default function GreenderLogo() {
  return (
    <header className="flex items-end justify-center p-2">
      <img
        src={GreenderLogoTransparent.src}
        className="size-10"
        alt="Greender Logo"
      />
      <h1 className={clsx("text-3xl text-black", chivoBold.className)}>
        Greender
      </h1>
    </header>
  );
}
