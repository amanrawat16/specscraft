"use client";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal"; 

export default function CreatePostButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded"
      >
        Create Blog
      </button>
      {open && <CreatePostModal onClose={() => setOpen(false)} />}
    </>
  );
}
