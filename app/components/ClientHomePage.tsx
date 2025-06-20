"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PostService } from "../lib/services";
import BlogCard from "./ui/BlogCard";
import SearchFilters from "./ui/SearchFilters";
import Link from "next/link";
import { BlogPost, SearchFilters as SearchFiltersType } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Skeleton loading component
function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col animate-pulse">
          {/* Image skeleton */}
          <div className="h-48 bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
          
          {/* Content skeleton */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2 flex-shrink-0"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 flex-grow"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-1/2"></div>
            
            {/* Footer skeleton */}
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClientHomePage({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({
    keyword: '',
    author: '',
    sortBy: 'newest',
  });
  const [totalResults, setTotalResults] = useState(initialPosts.length);

  const searchPosts = async () => {
    setSearching(true);
    try {
      const result = await PostService.searchPosts(filters);
      setPosts(result.posts);
      setTotalResults(result.total);
    } catch (error) {
      toast.error('Failed to search posts');
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (filters.keyword || filters.author || filters.sortBy !== 'newest') {
      searchPosts();
    } else {
      setPosts(initialPosts);
      setTotalResults(initialPosts.length);
    }
  }, [filters.keyword, filters.author, filters.sortBy, initialPosts]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog</h1>
          {session ? (
            <Link 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" 
              href="/create"
            >
              Create Post
            </Link>
          ) : (
            <Link 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium" 
              href="/auth/signin"
            >
              Sign in to Create
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <SearchFilters 
          onFiltersChange={handleFiltersChange}
          isLoading={searching}
        />

        {/* Results Summary */}
        <AnimatePresence>
          {(filters.keyword || filters.author || filters.sortBy !== 'newest') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Found <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> post{totalResults !== 1 ? 's' : ''}
                {filters.keyword && (
                  <span> matching "<span className="font-semibold">{filters.keyword}</span>"</span>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Grid */}
        {searching ? (
          <PostsSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">
                {filters.keyword || filters.author ? '🔍' : '📝'}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {filters.keyword || filters.author ? 'No posts found' : 'No blog posts yet'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {filters.keyword || filters.author 
                  ? 'Try adjusting your search criteria or browse all posts.'
                  : 'Be the first to create a blog post and share your insights!'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(filters.keyword || filters.author) && (
                  <button
                    onClick={() => setFilters({ keyword: '', author: '', sortBy: 'newest' })}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Clear Search
                  </button>
                )}
                {session ? (
                  <Link
                    href="/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Your First Post
                  </Link>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Sign in to Create
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            key={`posts-${filters.keyword}-${filters.author}-${filters.sortBy}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.2
                }}
                className="h-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
} 