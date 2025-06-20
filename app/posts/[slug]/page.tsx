import { PostService } from "@/app/lib/services";
import ClientPostDetail from "@/app/components/ClientPostDetail";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Skeleton loading component
function PostDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
          {/* Header skeleton */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          </div>
          
          {/* Image skeleton */}
          <div className="h-64 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* Content skeleton */}
          <div className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface PostDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = params;
  
  try {
    // Fetch post data on the server
    const post = await PostService.getPostBySlug(slug);
    
    if (!post) {
      notFound();
    }
    
    return (
      <Suspense fallback={<PostDetailSkeleton />}>
        <ClientPostDetail post={post} />
      </Suspense>
    );
  } catch (error) {
    console.error('Failed to load post:', error);
    notFound();
  }
}