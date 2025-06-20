import { BlogPost } from "@/app/types";
import { apiFetch } from ".";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Get all blog posts
export const getAllPosts = async () => {
  return await apiFetch<BlogPost[]>(`${BASE_URL}/api/posts`, {
    method: "GET",
  });
};

// Get a single blog post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    return await apiFetch<BlogPost | undefined>(`${BASE_URL}/api/posts/${slug}`, {
      method: "GET",
    });
  } catch (error: any) {
    if (error.message.includes("404")) {
      return undefined;
    }
    throw error;
  }
};

// Create a new blog post
export const createPost = async (data: Omit<BlogPost, "id" | "publishedAt">) => {
  return await apiFetch<BlogPost>(`${BASE_URL}/api/posts/create`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Edit/update a blog post by ID
export const editPost = async (
  id: string,
  data: Omit<BlogPost, "id" | "publishedAt">
) => {
  return await apiFetch<BlogPost>(`${BASE_URL}/api/posts/edit/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
