"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { BlogPost } from "@/app/types";
import { createPost } from "../lib/api/posts";

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    author: "",
    slug: "",
    coverImage: "",
    body: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.author.trim() || !form.slug.trim() || !form.body.trim()) {
      return "All fields except cover image are required.";
    }
    if (form.coverImage && !form.coverImage.startsWith("http")) {
      return "Cover image must be a valid URL.";
    }
    return null;
  };

  const handleSubmit = async () => {
    setError(null);
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      await createPost(form)

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div className="w-full max-w-2xl px-8 py-10 rounded border dark:border-gray-800 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-800"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-800"
        />
        <input
          name="slug"
          placeholder="Slug (e.g. my-post-title)"
          value={form.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-800"
        />
        <input
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-800"
        />
        <textarea
          name="body"
          placeholder="Blog body..."
          value={form.body}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-800"
          rows={6}
        />
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>
    </div>
  </main>
);

}