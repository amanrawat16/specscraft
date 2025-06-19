import { BlogPost } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
    post: BlogPost;
}

export default function BlogCard ({post}: BlogCardProps){

    const plainText : string = post.body.replace(/{{block[^}]+}}/g,"");

    return(
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      {post.coverImage && (
        <div className="relative w-full h-60 mb-4 rounded overflow-hidden">
          {/* We can add image domain but right now url can be from any domain so this may crash  */}
          {/* <Image
            src={post.coverImage}
            alt="Cover"
            layout="fill"
            objectFit="cover"
          /> */}
          <img src={post.coverImage} alt={post.title} className="rounded w-full" />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-1">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className="text-gray-600 text-sm mb-2">
        By {post.author} | {new Date(post.publishedAt).toLocaleDateString()}
      </p>

      <p className="text-gray-700">
        {plainText.slice(0, 200)}...
      </p>
    </div>
    )
}