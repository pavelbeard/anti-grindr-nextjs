"use client";

import Link from "next/link";
import { Suspense, lazy } from "react";
import WebFeaturesTextFallback from "./web-features-text-fallback";

const WebFeaturesTextArray = lazy(() => import("./web-features-text-array"));

import "./style.css";

export default function LandingBanner() {
  return (
    <div className="landingBanner">
      <section id="banner" role="banner">
        <div className="flair">WOW</div>
        <Link href="/members">Try Greender on the Web.</Link>
        <Suspense fallback={<WebFeaturesTextFallback />}>
          <WebFeaturesTextArray />
        </Suspense>
      </section>
    </div>
  );
}
