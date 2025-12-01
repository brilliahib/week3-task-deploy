import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { deleteCommentById } from "repositories/comment.repo";

export const deleteCommentRoute = new Elysia().use(isAuthenticated).delete(
  "/:postId/comments/:commentId",
  async ({ params: { commentId }, set }) => {
    const deleted = await deleteCommentById(commentId);

    if (!deleted) {
      set.status = 404;
      return { success: false, message: "Comment not found" };
    }

    set.status = 200;
    return {
      success: true,
      message: "Comment deleted",
    };
  },
  {
    params: t.Object({
      postId: t.String(),
      commentId: t.String(),
    }),
    detail: {
      summary: "Delete Comment",
      description: "Delete a comment by ID.",
      tags: ["Comments"],
    },
    response: {
      200: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
      404: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  }
);
