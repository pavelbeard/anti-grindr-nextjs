"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useChangeName from "@/lib/hooks/profile/useChangeName";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function MembersSidebarForm() {
  const { inputRef, name, form, onSubmit } = useChangeName();
  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative flex items-center gap-x-2">
              <FormControl>
                <Input
                  className="peer rounded-full border border-zinc-700 bg-zinc-600 text-white!"
                  {...field}
                  ref={inputRef}
                  placeholder={name.value ?? "Member name"}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                      form.reset();
                    }
                  }}
                />
              </FormControl>
              <span
                onClick={() => inputRef?.current?.focus()}
                className={cn(
                  "absolute right-2 top-0 bottom-0 flex p-1 items-center justify-center",
                  "group/pencil peer-focus:[&>svg]:stroke-white transition duration-200"
                )}
              >
                <PencilIcon
                  className={cn(
                    "group-hover/pencil:stroke-white size-3 text-zinc-400"
                  )}
                />
              </span>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
