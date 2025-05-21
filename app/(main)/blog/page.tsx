import clsx from "clsx";

export default function BlogPage() {
  return (
    <main
      className={clsx(
        "flex flex-col overflow-y-auto w-full px-8 py-[2em] text-white",
        "bg-linear-to-r from-green-700 to-green-500 bg-opacity-85"
      )}
    >
      <h1 className="text-6xl uppercase font-bold">Blog</h1>
      <p className="text-2xl mt-4">
        Welcome to our blog! Here, we share insights, tips, and stories about
        our journey in the world of dating applications and beyond.
      </p>
    </main>
  );
}
