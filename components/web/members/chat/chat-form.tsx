import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SendMessageSchema,
  type SendMessageType,
} from "@/lib/api/member/chat/chat.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export default function ChatForm({
  chatId,
  userB,
}: {
  chatId: string | null;
  userB: string | null;
}) {
  const [isDisabled, setIsDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  const sendMessage = async (data: SendMessageType) => {
    await fetch(`/api/chat/${chatId}/send?userId=${userB}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json",
      },
      body: JSON.stringify(data.text.trim()),
    });
  };

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
        className="flex w-full items-center gap-x-2 p-4"
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
