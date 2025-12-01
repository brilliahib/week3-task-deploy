import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { createComment } from "repositories/comment.repo";

export const createCommentRoute = new Elysia().use(isAuthenticated).post(
  "/:id/comments",
  async ({ params: { id }, body, user, set }) => {
    const comment = await createComment({
      content: body.content,
      post: { connect: { id } },
      author: { connect: { id: user!.id } },
    });

    set.status = 201;
    return {
      success: true,
      message: "Comment created",
      data: comment,
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      content: t.String(),
    }),
    detail: {
      summary: "Create Comment",
      description: "Create a new comment for a specific post.",
      tags: ["Comments"],
    },
    response: {
      201: t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: t.Object({
          id: t.String(),
          content: t.String(),
        }),
      }),
      401: t.Object({
        message: t.String(),
      }),
    },
  }
);
