import clsx from "clsx";

export default function About() {
  return (
    <main
      className={clsx(
        "flex flex-col overflow-y-auto w-full px-8 py-[2em] text-white",
        "bg-linear-to-r from-green-700 to-green-500 bg-opacity-85"
      )}
    >
      <h1 className="text-6xl uppercase font-bold">About Greender</h1>

      <p className="text-2xl mt-4">
        Greender is a platform that allows you to connect with others.
      </p>
      <p className="text-2xl mt-4">
        We are focused on providing a great user experience.
      </p>
      <p className="text-2xl mt-4">
        Our goal is to help you find the right connections.
      </p>
    </main>
  );
}
