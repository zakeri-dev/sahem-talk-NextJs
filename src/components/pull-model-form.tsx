"use client";

import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl, // Add FormControl
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { throttle } from "lodash";
import useChatStore from "@/app/hooks/useChatStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "لطفا سنخگوی مورد نظر خودتون رو وارد کنید",
  }),
});

export default function PullModelForm() {
  const {
    isDownloading,
    downloadProgress,
    downloadingModel,
    startDownload,
    stopDownload,
    setDownloadProgress,
  } = useChatStore();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handlePullModel = async (data: z.infer<typeof formSchema>) => {
    const modelName = data.name.trim();
    startDownload(modelName);

    const throttledSetProgress = throttle((progress: number) => {
      setDownloadProgress(progress);
    }, 200);

    let lastStatus: string | null = null;

    try {
      const response = await fetch("/api/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: modelName }),
      });

      if (!response.ok) {
        throw new Error("در پاسخ شبکه مشکلی هست!");
      }

      if (!response.body) {
        throw new Error("یک جای کار مشکل داره!");
      }

      await processStream(response.body, throttledSetProgress, lastStatus);

      toast.success("دانلود سخنگوی جدید با موفقیت انجام شد.");
      router.refresh();
    } catch (error) {
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : "عدم موفقیت در دانلود سخنگوی جدید"
        }`
      );
    } finally {
      stopDownload();
      throttledSetProgress.cancel();
    }
  };

  const processStream = async (
    body: ReadableStream<Uint8Array>,
    throttledSetProgress: (progress: number) => void,
    lastStatus: string | null
  ) => {
    const reader = body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const jsonObjects = text.trim().split("\n");

      for (const jsonObject of jsonObjects) {
        try {
          const responseJson = JSON.parse(jsonObject);

          if (responseJson.error) {
            throw new Error(responseJson.error);
          }

          if (
            responseJson.completed !== undefined &&
            responseJson.total !== undefined
          ) {
            const progress =
              (responseJson.completed / responseJson.total) * 100;
            throttledSetProgress(progress);
          }

          if (responseJson.status && responseJson.status !== lastStatus) {
            toast.info(`Status: ${responseJson.status}`);
            lastStatus = responseJson.status;
          }
        } catch (error) {
          throw new Error("ارور کامپایل json");
        }
      }
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handlePullModel(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام سخنگوی جدید</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="llama2"
                  value={field.value || ""}
                />
              </FormControl>
              <p className="text-xs pt-1">
                برای سخنگو های بیشتر
                <a
                  href="https://ollama.com/library"
                  target="_blank"
                  className="text-blue-500 underline"
                  >
                  کتابخانه
                </a>{" "}
                  را بررسی کنید{" "}
              </p>
              <FormMessage />
              <div className="space-y-2 w-full">
                <Button
                  type="submit"
                  className="w-full "
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <div className="flex items-center gap-2">
                      <Loader2Icon className="animate-spin w-4 h-4" />
                      <span>
                        Pulling {downloadingModel}...{" "}
                        {downloadProgress.toFixed(0)}%
                      </span>
                    </div>
                  ) : (
                    "دانلود پاسخگو"
                  )}
                </Button>
                <p className="text-xs text-center">
                  {isDownloading
                    ? "این ممکن است مدتی طول بکشد. شما می توانید با خیال راحت این پنجره را ببندید و به استفاده از برنامه ادامه دهید."
                    : "با فشار دادن این دکمه، پاسخگوی مشخص شده به دستگاه شما دانلود خواهد شد."}
                </p>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
