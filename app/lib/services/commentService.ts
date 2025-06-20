import { Comment } from "@/app/types";
import { BaseService } from "./baseService";

export class CommentService extends BaseService {
  // Get comments for a post
  static async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      return await this.apiCall<Comment[]>(`/api/comments/${postId}`, {
        method: 'GET',
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  // Create new comment
  static async createComment(postId: string, content: string): Promise<Comment> {
    try {
      const result = await this.apiCallWithAuth<Comment>('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          content,
        }),
      });
      return result;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  // Delete comment
  static async deleteComment(postId: string, commentId: string): Promise<void> {
    try {
      await this.apiCallWithAuth<void>(`/api/comments/${postId}?commentId=${commentId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
} 