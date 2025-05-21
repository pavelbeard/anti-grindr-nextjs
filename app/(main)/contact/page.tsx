import clsx from "clsx";

export default function ContactPage() {
  return (
    <main
      className={clsx(
        "flex flex-col overflow-y-auto w-full px-8 py-[2em] text-white",
        "bg-linear-to-r from-green-700 to-green-500 bg-opacity-85"
      )}
    >
      <h1 className="text-6xl uppercase font-bold">Contact Us</h1>
      <p className="text-2xl mt-4">
        If you have any questions or feedback, feel free to reach out to us!
      </p>
      <p className="text-2xl mt-4">
        You can contact us at:{" "}
        <a
        //   href="mailto:contact@greender.com"
          href="#"
          className="font-semibold hover:underline"
        >
          contact@greender.com (doesn&#39;t work yet)
        </a>
      </p>
    </main>
  );
}
