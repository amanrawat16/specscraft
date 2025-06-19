import Link from "next/link";
import { ReactNode } from "react";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen p-6">
      <main className="max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
