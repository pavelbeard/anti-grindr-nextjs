import React, { type SVGProps } from "react";

type LoadingSpinnerProps = SVGProps<SVGSVGElement> & {
  text: string;
};

export default function LoadingSpinner({
  text,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-x-0.5">
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-white">{text}</span>
    </div>
  );
}
