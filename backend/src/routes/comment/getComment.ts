import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { findCommentsByPostId } from "repositories/comment.repo";

export const getCommentsByPostId = new Elysia().use(isAuthenticated).get(
  "/:id/comments",
  async ({ params: { id }, set }) => {
    const comments = await findCommentsByPostId(id);

    set.status = 200;
    return {
      success: true,
      message: "Comments retrieved",
      data: comments,
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    detail: {
      summary: "Get Comments",
      description: "Retrieve all comments for a specific post (no pagination).",
      tags: ["Comments"],
    },
  }
);
