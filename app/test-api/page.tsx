"use client";

import { useState } from "react";
import { PostService } from "../lib/services";

export default function TestApiPage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testApis = async () => {
    setLoading(true);
    const testResults: any = {};

    try {
      // Test 1: Get all posts
      console.log('🧪 Testing getAllPosts...');
      const posts = await PostService.getAllPosts();
      testResults.getAllPosts = { success: true, count: posts.length };
      console.log('✅ getAllPosts success:', posts.length, 'posts');
    } catch (error) {
      testResults.getAllPosts = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      console.error('❌ getAllPosts failed:', error);
    }

    try {
      // Test 2: Search posts
      console.log('🧪 Testing searchPosts...');
      const searchResult = await PostService.searchPosts({ keyword: '', author: '', sortBy: 'newest' });
      testResults.searchPosts = { success: true, count: searchResult.posts.length };
      console.log('✅ searchPosts success:', searchResult.posts.length, 'posts');
    } catch (error) {
      testResults.searchPosts = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      console.error('❌ searchPosts failed:', error);
    }

    try {
      // Test 3: Get post by slug (if posts exist)
      if (results.getAllPosts?.count > 0) {
        console.log('🧪 Testing getPostBySlug...');
        const firstPost = await PostService.getAllPosts();
        if (firstPost.length > 0) {
          const post = await PostService.getPostBySlug(firstPost[0].slug);
          testResults.getPostBySlug = { success: true, postTitle: post?.title };
          console.log('✅ getPostBySlug success:', post?.title);
        } else {
          testResults.getPostBySlug = { success: false, error: 'No posts available to test' };
        }
      } else {
        testResults.getPostBySlug = { success: false, error: 'No posts available to test' };
      }
    } catch (error) {
      testResults.getPostBySlug = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      console.error('❌ getPostBySlug failed:', error);
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <button
        onClick={testApis}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test All APIs'}
      </button>

      <div className="space-y-4">
        {Object.entries(results).map(([apiName, result]: [string, any]) => (
          <div key={apiName} className={`p-4 rounded border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className="font-bold">{apiName}</h3>
            {result.success ? (
              <p className="text-green-700">
                ✅ Success: {result.count ? `${result.count} posts` : result.postTitle ? `Found: ${result.postTitle}` : 'API call successful'}
              </p>
            ) : (
              <p className="text-red-700">❌ Failed: {result.error}</p>
            )}
          </div>
        ))}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Raw Results:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 