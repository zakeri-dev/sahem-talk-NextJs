import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

import { DownloadIcon } from "@radix-ui/react-icons";
import PullModelForm from "./pull-model-form";

export default function PullModel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full gap-2 p-1 items-center cursor-pointer justify-end">
          <p>دانلود سخنگوی جدید</p>
          <DownloadIcon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogTitle className="pr-4">دانلود سخنگوی جدید</DialogTitle>
        <PullModelForm />
      </DialogContent>
    </Dialog>
  );
}
