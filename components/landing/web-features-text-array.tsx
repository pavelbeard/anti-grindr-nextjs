"use client";

import { useEffect, useState } from "react";

import "./style.css";

export default function WebFeaturesTextArray() {
  const features = [
    "Connect to the grid",
    "No app required",
    "For all devices",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    if (features.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevCurrentIndex) => {
        setPreviousIndex(prevCurrentIndex);
        return (prevCurrentIndex + 1) % features.length;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [features.length]);

  return (
    <div className="text-left text-[#B5B5BA] w-[10em] relative min-h-[18px] overflow-hidden">
      {/* Adjusted min-h for typical line height and added overflow-hidden */}
      {features.map((feature, index) => {
        let featureClass = "feature"; // Default state
        if (index === currentIndex) {
          featureClass = "feature entering"; // Current item to display
        } else if (index === previousIndex && previousIndex !== null) {
          featureClass = "feature exiting"; // Previous item that is now exiting
        }

        return (
          <div
            key={index}
            className={`feature text-lg font-light ${featureClass}`}
          >
            {feature}
          </div>
        );
      })}
    </div>
  );
}
