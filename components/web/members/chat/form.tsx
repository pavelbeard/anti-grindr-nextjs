import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SendMessageType } from "@/lib/api/member/chat/chat.schemas";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function ChatForm({
  sendMessage,
  inputRef,
  form,
}: {
  sendMessage: (data: SendMessageType) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  form: UseFormReturn<SendMessageType>;
}) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (form.watch("text").length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [form.watch("text")]);

  return (
    <Form {...form}>
      <form
        className="bg-black flex w-full items-center gap-x-2 p-4"
        onSubmit={form.handleSubmit(sendMessage)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  ref={inputRef}
                  className="border z-50 border-zinc-300 text-white rounded-lg p-2 w-full"
                  placeholder="Type your message..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          aria-invalid="false"
          disabled={isDisabled}
          type="submit"
          className={clsx(
            "flex-none bg-green-600 font-semibold hover:bg-green-500 hover:text-white",
            {
              "opacity-50 cursor-not-allowed": isDisabled,
            }
          )}
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
