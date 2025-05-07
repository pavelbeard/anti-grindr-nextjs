import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const iconData = await readFile(join(process.cwd(), "public", "apple-touch-icon.png"));
  const iconSrc = Uint8Array.from(iconData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={iconSrc as unknown as string}
          alt="favicon.ico"
          width={size.width}
          height={size.height}
        />
      </div>
    )
  );
}
