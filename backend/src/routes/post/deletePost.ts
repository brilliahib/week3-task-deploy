import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { deletePostById } from "repositories/post.repo";

export const deletePostRoute = new Elysia().use(isAuthenticated).delete(
  "/:id",
  async ({ params: { id }, set }) => {
    const deleted = await deletePostById(id);

    if (!deleted) {
      set.status = 404;
      return { success: false, message: "Post not found" };
    }

    set.status = 200;
    return {
      success: true,
      message: "Post deleted",
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    detail: {
      summary: "Delete Post",
      description: "Delete a post by ID.",
      tags: ["Posts"],
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
