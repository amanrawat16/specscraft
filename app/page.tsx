import Image from "next/image";
import { getAllPosts } from "./lib/api/posts";
import  BlogCard from "./components/ui/BlogCard";

export default async function Home() {

  const posts = await getAllPosts();

  return (

      <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </main>

  
  );
}
