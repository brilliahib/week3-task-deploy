import { Elysia, t } from "elysia";
import { CommentController } from "./comment.controller";
import { getUserFromJWT } from "../../utils/user/get-user.utils";
import jwt from "@elysiajs/jwt";

export const CommentModule = new Elysia({ prefix: "/comments" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )

  .post(
    "/",
    async ({ jwt, headers, set, body }) => {
      const user = await getUserFromJWT(jwt, headers, set);
      if (!user) return { error: "Unauthorized" };

      return CommentController.createComment(body, user, set);
    },
    {
      body: t.Object({
        postId: t.String(),
        content: t.String(),
      }),
      detail: {
        summary: "Create Comment",
        description: "Create a new comment on a post.",
        tags: ["Comments"],
      },
    }
  )

  .get(
    "/post/:postId",
    async ({ params }) => CommentController.getCommentsByPost(params.postId),
    {
      params: t.Object({
        postId: t.String(),
      }),
      detail: {
        summary: "Get Comments by Post",
        description: "Retrieve all comments for a specific post.",
        tags: ["Comments"],
      },
    }
  )

  .put(
    "/:commentId",
    async ({ jwt, headers, set, params, body }) => {
      const user = await getUserFromJWT(jwt, headers, set);
      if (!user) return { error: "Unauthorized" };

      return CommentController.updateComment(params.commentId, body, user, set);
    },
    {
      params: t.Object({
        commentId: t.String(),
      }),
      body: t.Object({
        content: t.String(),
      }),
      detail: {
        summary: "Update Comment",
        description: "Update an existing comment.",
        tags: ["Comments"],
      },
    }
  )

  .delete(
    "/:commentId",
    async ({ jwt, headers, set, params }) => {
      const user = await getUserFromJWT(jwt, headers, set);
      if (!user) return { error: "Unauthorized" };

      return CommentController.deleteComment(params.commentId, user, set);
    },
    {
      params: t.Object({
        commentId: t.String(),
      }),
      detail: {
        summary: "Delete Comment",
        description: "Delete a comment by ID.",
        tags: ["Comments"],
      },
    }
  );
