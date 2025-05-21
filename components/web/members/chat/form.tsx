import clsx from "clsx";

export default function ChatForm({
  sendMessage,
  inputRef,
  text,
  setText,
}: {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form
      className="relative flex flex-1/3 items-center gap-2"
      onSubmit={sendMessage}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        className="flex-2/3 border border-zinc-300 text-white rounded-lg p-2 w-full"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className={clsx(
          "flex-1/5 text-green-500 font-semibold p-2 w-16",
          "absolute top-0 right-0 h-full",
          {
            hidden: inputRef.current?.value.length === 0,
          }
        )}
      >
        Send
      </button>
    </form>
  );
}
