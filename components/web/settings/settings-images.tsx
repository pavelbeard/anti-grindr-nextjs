"use client";

import { useState } from "react";

export default function Images() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  return (
    <div className="w-24 h-32 bg-zinc-300 rounded-lg flex justify-center items-center">
      <span className="text-zinc-500">No images uploaded</span>
    </div>
  );
}
