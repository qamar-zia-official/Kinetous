"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        <MdArrowBack /> Back
      </Button>
    </div>
  );
}
