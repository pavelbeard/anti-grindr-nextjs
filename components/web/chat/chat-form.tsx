"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendMessageType } from "@/lib/data/message/message.schemas";
import { useChatContainerContext } from "@/lib/providers/chat-container-context";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ChatForm() {
  const { sendMessage } = useChatContainerContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const form = useForm<SendMessageType>({
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    setIsDisabled(!form.watch("text").trim());
  }, [form.watch("text")]);

  const sendMessageHandler = async (data: SendMessageType) => {
    await sendMessage({ ...data });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center gap-x-2"
        onSubmit={form.handleSubmit(sendMessageHandler)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem
              className={cn(
                "transition-all duration-300",
                !isDisabled ? "w-[calc(100%-36px)]" : "w-full"
              )}
            >
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className={cn(
                    "border-none z-50  bg-zinc-700 text-white rounded-lg p-2 w-full",
                    "shadow-zinc-500 shadow-xs hover:shadow-lg",
                    "focus:ring-2! focus:ring-green-500! focus:shadow-md"
                  )}
                  placeholder="Type your message..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        {!isDisabled && (
          <Button
            type="submit"
            aria-invalid="false"
            className={cn(
              "aspect-square animate-in fade-in slide-in-from-right-5 duration-300"
            )}
            disabled={isDisabled}
          >
            Send
          </Button>
        )}
      </form>
    </Form>
  );
}
