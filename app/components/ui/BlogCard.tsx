"use client";

import { BlogPost } from "@/app/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { formatDate } from "@/app/lib/utils/dateUtils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { data: session } = useSession();
  const isAuthor = session?.user?.id && post.authorId === session.user.id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        opacity: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={post.coverImage}
          alt={post.title || 'Untitled Post'}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Date Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-black/60 text-white text-xs rounded">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 flex-shrink-0">
          {post.title || 'Untitled Post'}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3 flex-grow">
          {post.body.length > 120 ? `${post.body.substring(0, 120)}...` : post.body}
        </p>

        {/* Author and Actions */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">By</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAuthor && (
              <Link
                href={`/edit/${post.slug}`}
                className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            )}
            <Link
              href={`/posts/${post.slug}`}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors inline-block"
            >
              Read
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}