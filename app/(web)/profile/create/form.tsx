"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateProfile from "@/lib/hooks/useCreateProfile";

export default function CreateProfileForm() {
  const { form, errorState, errorIssue, onSubmit } = useCreateProfile();

  return (
    <Form {...form}>
      <div className="flex flex-col p-4 space-y-4 bg-black/65 rounded-2xl backdrop-blur-2xl bg-clip-border">
        <div className="mb-4">
          <FormDescription className="text-white">
            Please enter your date of birth:
          </FormDescription>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <section className="flex space-x-8">
            <FormField
              control={form.control as unknown as any}
              name="day"
              render={({ field }) => (
                <FormItem className="w-16">
                  <FormLabel className="text-white" data-error={errorState}>
                    DD
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-white"
                      aria-invalid={errorState}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as any}
              name="month"
              render={({ field }) => (
                <FormItem className="w-16">
                  <FormLabel className="text-white" data-error={errorState}>
                    MM
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-white"
                      aria-invalid={errorState}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as any}
              name="year"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel className="text-white" data-error={errorState}>
                    YYYY
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-white"
                      aria-invalid={errorState}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
          {errorIssue && <div className="text-red-500">{errorIssue}</div>}
          <Button
            className="action"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>
    </Form>
  );
}
