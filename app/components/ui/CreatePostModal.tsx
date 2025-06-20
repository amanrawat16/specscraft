"use client";

import { useState } from "react";
import { apiFetch } from "@/app/lib/api"; 
import { BlogPost } from "@/app/types";

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    body: "",
    slug: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name, value} = e.target;
    setForm((prev)=>({...prev, [name]:value}))
  }

  const handleSubmit = async()=>{
    setLoading(true);
    setError(null);

    try{
        await apiFetch<BlogPost>("/api/posts/create",{
            method: "POST",
            body : form,
        });
        setLoading(false);
        onClose();

    }catch(error : any){
        setError(error.message || "Failed to create post");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black dark:text-white bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

        <div className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Author"
            className="w-full p-2 border rounded"
            value={form.author}
            onChange={handleChange}
          />
          <input
            name="slug"
            placeholder="Slug (e.g., my-awesome-post)"
            className="w-full p-2 border rounded"
            value={form.slug}
            onChange={handleChange}
          />
          <input
            name="coverImage"
            placeholder="Cover Image URL (optional)"
            className="w-full p-2 border rounded"
            value={form.coverImage}
            onChange={handleChange}
          />
          <textarea
            name="body"
            placeholder="Body content..."
            rows={4}
            className="w-full p-2 border rounded"
            value={form.body}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded border"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
