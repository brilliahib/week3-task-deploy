import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { createPost } from "repositories/post.repo";

export const createPostRoute = new Elysia().use(isAuthenticated).post(
  "/",
  async ({ body, user, set }) => {
    const post = await createPost({
      title: body.title,
      content: body.content,
      author: { connect: { id: user!.id } },
    });

    set.status = 201;
    return {
      success: true,
      message: "Post created",
      data: post,
    };
  },
  {
    body: t.Object({
      title: t.String(),
      content: t.String(),
    }),
    detail: {
      summary: "Create Post",
      description: "Endpoint to create a new post.",
      tags: ["Posts"],
    },
    response: {
      201: t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: t.Object({
          id: t.String(),
          title: t.String(),
          content: t.String(),
        }),
      }),
      401: t.Object({
        message: t.String(),
      }),
    },
  }
);
