import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
  const iconData = await readFile(join(process.cwd(), "app", "favicon.ico"));
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
