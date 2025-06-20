import { PostService } from "./lib/services";
import ClientHomePage from "./components/ClientHomePage";
import { Suspense } from "react";

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

// Server component
export default async function Home() {
  // Fetch posts on the server
  const posts = await PostService.getAllPosts();
  
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <ClientHomePage initialPosts={posts} />
    </Suspense>
  );
}
