import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { updateCommentById } from "repositories/comment.repo";

export const updateCommentRoute = new Elysia().use(isAuthenticated).put(
  "/:postId/comments/:commentId",
  async ({ params: { commentId }, body, set }) => {
    const updated = await updateCommentById(commentId, body);

    if (!updated) {
      set.status = 404;
      return { success: false, message: "Comment not found" };
    }

    set.status = 200;
    return {
      success: true,
      message: "Comment updated",
      data: updated,
    };
  },
  {
    params: t.Object({
      postId: t.String(),
      commentId: t.String(),
    }),
    body: t.Object({
      content: t.String(),
    }),
    detail: {
      summary: "Update Comment",
      description: "Update a comment belonging to a post.",
      tags: ["Comments"],
    },
    response: {
      200: t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: t.Object({
          id: t.String(),
          content: t.String(),
        }),
      }),
      404: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  }
);
