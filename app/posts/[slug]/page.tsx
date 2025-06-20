import { getPostBySlug } from "@/app/lib/api/posts";
import { parseBlock } from "@/app/lib/utils/parseBlocks";
import { BlogPost } from "@/app/types";
import { notFound } from "next/navigation";

type Props = {
    params:{
        slug:string;
    }
}

export default async function BlogDetailPage({params}: Props){

    const post : BlogPost | undefined = await getPostBySlug(params.slug)

    if(!post) return notFound()
    
    return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        By {post.author} | {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt="Cover"
          className="mb-6 rounded shadow"
        />
      )}
      <div className="prose dark:prose-invert max-w-none">
        {parseBlock(post.body)}
      </div>
    </main>
  );

}