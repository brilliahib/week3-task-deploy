import { fail, ok } from "../../utils/responses/response.util";
import { CommentService } from "./comment.service";

const commentService = new CommentService();

export const CommentController = {
  async createComment(body: any, user: any, set: any) {
    try {
      const comment = await commentService.createComment(user, body);

      set.status = 201;
      return ok("Comment created successfully", comment);
    } catch (error) {
      console.error(error);
      set.status = 500;
      return fail("Failed to create comment");
    }
  },

  async getCommentsByPost(postId: string) {
    try {
      const comments = await commentService.getCommentsByPost(postId);
      return ok("Comments fetched successfully", comments);
    } catch (error) {
      console.error(error);
      return fail("Failed to fetch comments");
    }
  },

  async updateComment(commentId: string, body: any, user: any, set: any) {
    try {
      const updated = await commentService.updateComment(
        commentId,
        user.id,
        body.content
      );

      return ok("Comment updated successfully", updated);
    } catch (error: any) {
      console.error(error);
      set.status = 400;
      return fail(error.message || "Failed to update comment");
    }
  },

  async deleteComment(commentId: string, user: any, set: any) {
    try {
      const deleted = await commentService.deleteComment(commentId, user.id);

      return ok("Comment deleted successfully", deleted);
    } catch (error: any) {
      console.error(error);
      set.status = 400;
      return fail(error.message || "Failed to delete comment");
    }
  },
};
