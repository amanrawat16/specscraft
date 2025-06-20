import { BlogPost, SearchFilters, SearchResult } from "@/app/types";
import { BaseService } from "./baseService";

export class PostService extends BaseService {
  // Get all posts
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      return await this.apiCall<BlogPost[]>('/api/posts', {
        method: 'GET',
      });
    } catch (error) {
      return [];
    }
  }

  // Get post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      return await this.apiCall<BlogPost>(`/api/posts/${slug}`, {
        method: 'GET',
      });
    } catch (error) {
      return undefined;
    }
  }

  // Create new post
  static async createPost(postData: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
    try {
      const result = await this.apiCallWithAuth<BlogPost>('/api/posts/create', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update post
  static async updatePost(slug: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const result = await this.apiCallWithAuth<BlogPost>(`/api/posts/edit/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete post
  static async deletePost(slug: string): Promise<void> {
    try {
      await this.apiCallWithAuth<void>(`/api/posts/${slug}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw error;
    }
  }

  // Search and filter posts
  static async searchPosts(filters: SearchFilters, page: number = 1, limit: number = 10): Promise<SearchResult> {
    try {
      const params = new URLSearchParams();
      
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.author) params.append('author', filters.author);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const result = await this.apiCall<SearchResult>(`/api/posts/search?${params.toString()}`, {
        method: 'GET',
      });
      
      return result;
    } catch (error) {
      return {
        posts: [],
        total: 0,
        filters,
      };
    }
  }
}