import GreenderLogoTransparent from "@/public/greender_logo_black_transparent.png";
import { xpressHeavyBoldItalic } from "@/styles/fonts";

export default function GreenderLogo() {
  return (
    <header className="flex items-end justify-center p-2">
      <img
        src={GreenderLogoTransparent.src}
        className="size-10"
        alt="Greender Logo"
      />
      <h1 className={`text-3xl text-black ${xpressHeavyBoldItalic.className}`}>
        Greender
      </h1>
    </header>
  );
}
