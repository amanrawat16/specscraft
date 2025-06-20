"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Comment } from "@/app/types";
import { CommentService } from "@/app/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { formatDateTime } from "@/app/lib/utils/dateUtils";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const fetchedComments = await CommentService.getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (err) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setSubmitting(true);

    try {
      const comment = await CommentService.createComment(postId, newComment);
      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment posted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await CommentService.deleteComment(postId, commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete comment");
    }
  };

  const canDeleteComment = (comment: Comment) => {
    return session?.user?.id === comment.authorId || session?.user?.role === 'ADMIN';
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Comments ({comments.length})</h3>

      {/* Add Comment Form */}
      {session ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmitComment}
          className="mb-8"
        >
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={submitting}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {newComment.length}/500 characters
              </p>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Please sign in to leave a comment
          </p>
        </motion.div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No comments yet. Be the first to comment!
          </motion.div>
        ) : (
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(comment.createdAt)}
                    </p>
                  </div>
                  {canDeleteComment(comment) && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
} 