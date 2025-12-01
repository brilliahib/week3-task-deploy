import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { updatePostById } from "repositories/post.repo";

export const updatePostRoute = new Elysia().use(isAuthenticated).put(
  "/:id",
  async ({ params: { id }, body, set }) => {
    const updated = await updatePostById(id, body);

    if (!updated) {
      set.status = 404;
      return { success: false, message: "Post not found" };
    }

    set.status = 200;
    return {
      success: true,
      message: "Post updated",
      data: updated,
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
    detail: {
      summary: "Update Post",
      description: "Update an existing post.",
      tags: ["Posts"],
    },
    response: {
      200: t.Object({
        success: t.Boolean(),
        message: t.String(),
        data: t.Object({
          id: t.String(),
          title: t.String(),
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
