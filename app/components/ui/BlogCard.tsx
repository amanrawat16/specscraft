import { BlogPost } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
    post: BlogPost;
}

export default function BlogCard ({post}: BlogCardProps){

    const plainText : string = post.body.replace(/{{block[^}]+}}/g,"");

    return(
    <div className="border dark:border-gray-800 dark:bg-gray-950 rounded-lg p-4 shadow hover:shadow-md transition">
      {post.coverImage && (
        <div className="relative w-full h-60 mb-4 rounded overflow-hidden">
          {/* <Image
            src={post.coverImage}
            alt="Cover"
            layout="fill"
            objectFit="cover"
          /> */}
          <img src={post.coverImage} alt={post.title} className="rounded w-full h-full object-cover" />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-1">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className="text-gray-600 dark:text-gray-500 text-sm mb-2 flex justify-between">
        By {post.author} | {new Date(post.publishedAt).toLocaleDateString()}
        <Link
          href={`/edit/${post.id}`}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Edit
        </Link>
      </p>

      <p className="text-gray-700 dark:text-gray-600">
        {plainText.slice(0, 200)}...
      </p>
      
    </div>
    )
}