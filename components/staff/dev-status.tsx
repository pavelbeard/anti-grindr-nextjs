"use client";

import DevLogo from "@/components/svg/staff/dev-logo";
import PreviewLogo from "@/components/svg/staff/preview-logo";

export default function DevStatus() {
  return (
    process.env.NODE_ENV !== "production" && (
      <div className="fixed z-100 flex place-content-center bottom-5 right-5 bg-[#b7acac] rounded-full p-0.5 font-bold">
        {process.env.NODE_ENV == "test" ? (
          <PreviewLogo height={48} width={48} />
        ) : (
          <DevLogo height={48} width={48} />
        )}
      </div>
    )
  );
}
