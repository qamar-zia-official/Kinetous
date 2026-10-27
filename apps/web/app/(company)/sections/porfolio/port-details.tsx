"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { cn } from "@repo/ui/utils";
import ReactMarkdown from "react-markdown";
export default function PortDetails({ details }: { details: string }) {
  return (
    <>
      <div
        className={cn(
          "prose dark:prose-invert overflow-hidden",
          "h-50 md:h-100 mask-b-from-0",
        )}
      >
        <ReactMarkdown>{details}</ReactMarkdown>
      </div>
      <Dialog>
        <DialogTrigger>
          <p className="text-blue-400 text-sm underline cursor-pointer">
            {"See more"}
          </p>
        </DialogTrigger>
        <DialogContent
          className="max-h-[85vh] max-w-[90vw] overflow-y-auto lg:min-w-200"
          role="dialog"
        >
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[70vh] max-w-[90vw] overflow-y-auto">
            <ReactMarkdown>{details}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
