import Image from "next/image";
import { getAllPosts } from "./lib/api/posts";
import  BlogCard from "./components/ui/BlogCard";
import CreatePostButton from "@/app/components/ui/CreatePostButton"
import Link from "next/link";
import { BlogPost } from "./types";

export default async function Home() {

  const posts : BlogPost[] | undefined = await getAllPosts();

  return (
      <main className="container mx-auto py-10 px-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          <Link className="flex border px-3 items-center rounded bg-gray-950 text-white dark:border-gray-800" href={"/create"}>Create Blog</Link> 
          {/* <CreatePostButton/> */}
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </main>

  
  );
}
