import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Greender - Be free from bindings. You are our focus.";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

export default async function OpenGraphImage() {
  const ogImageData = await readFile(join(process.cwd(), "public", "og-image.png"));
  const ogImageSrc = Uint8Array.from(ogImageData).buffer;

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
          src={ogImageSrc as unknown as string}
          alt="Greender - Be free from bindings. You are our focus."
          width={size.width}
          height={size.height}
        />
      </div>
    )
  );
}
