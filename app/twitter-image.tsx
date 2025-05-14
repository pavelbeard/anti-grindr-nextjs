import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Greender - Be free from bindings. You are our focus.";
export const contentType = "image/png";

export const size = {
  width: 600,
  height: 600,
};

export default async function TwitterImage() {
  const twitterImageData = await readFile(
    join(process.cwd(), "public", "twitter-image.png")
  );
  const twitterImageSrc = Uint8Array.from(twitterImageData).buffer;

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
          src={twitterImageSrc as unknown as string}
          alt="Greender - Be free from bindings. You are our focus."
          width={size.width}
          height={size.height}
        />
      </div>
    )
  );
}
