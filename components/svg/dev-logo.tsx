import type { SVGProps } from "react";

export default function DevLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" r="50" fill="black" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        fontFamily="sans-serif"
        fontWeight="bold"
        dy=".3em"
      >
        DEV
      </text>
    </svg>
  );
}