"use client";

import { motion } from "framer-motion";
import { parseBlock } from "@/app/lib/utils/parseBlocks";
import { BlogPost } from "@/app/types";
import CommentSection from "./ui/CommentSection";
import { formatFullDate } from "@/app/lib/utils/dateUtils";
import Link from "next/link";

interface ClientPostDetailProps {
  post: BlogPost;
}

export default function ClientPostDetail({ post }: ClientPostDetailProps) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Header */}
          <header className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title || 'Untitled Post'}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span>By <span className="font-medium text-gray-900 dark:text-white">
                {post.author}
              </span></span>
              <span>•</span>
              <span>{formatFullDate(post.publishedAt)}</span>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative overflow-hidden">
              <img
                src={post.coverImage}
                alt="Cover"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none text-gray-900 dark:text-gray-300">
              {parseBlock(post.body)}
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <CommentSection postId={post.id} />
          </div>
        </motion.article>
      </div>
    </main>
  );
} 