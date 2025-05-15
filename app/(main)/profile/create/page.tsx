"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DOBSchema, DOBType } from "@/lib/services/profile.schemas";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function CreateProfileForm() {
  const form = useForm({
    resolver: zodResolver(DOBSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  const onSubmit = async (data: DOBType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="flex flex-col p-4 space-y-2 bg-black/80 rounded-2xl backdrop-blur-2xl bg-clip-border">
        <div className="mb-4">
          <FormDescription className="text-white">
            Please enter your date of birth:
          </FormDescription>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-8">
          <FormField
            control={form.control as unknown as any}
            name="day"
            render={({ field }) => (
              <FormItem className="w-16">
                <FormLabel className="text-white">DD</FormLabel>
                <FormControl>
                  <Input {...field} className="text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as unknown as any}
            name="month"
            render={({ field }) => (
              <FormItem className="w-16">
                <FormLabel className="text-white">MM</FormLabel>
                <FormControl>
                  <Input {...field} className="text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as unknown as any}
            name="year"
            render={({ field }) => (
              <FormItem className="w-24">
                <FormLabel className="text-white">YYYY</FormLabel>
                <FormControl>
                  <Input {...field} className="text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  );
}
