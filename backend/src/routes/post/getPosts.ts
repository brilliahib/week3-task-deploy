import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import { findPosts, findPostsCount } from "repositories/post.repo";

export const getPosts = new Elysia().use(isAuthenticated).get(
  "/",
  async ({ query, set }) => {
    const page = Number(query.page) || 1;
    const take = Number(query.take) || 10;
    const search = query.search as string | undefined;

    const [total, posts] = await Promise.all([
      findPostsCount({ search }),
      findPosts({ search, page, take }),
    ]);

    set.status = 200;
    return {
      success: true,
      message: "Posts retrieved",
      data: { total, page, take, posts },
    };
  },
  {
    query: t.Object({
      page: t.Optional(t.Numeric()),
      take: t.Optional(t.Numeric()),
      search: t.Optional(t.String()),
    }),
    detail: {
      summary: "Get Posts",
      description: "Retrieve posts with pagination and search.",
      tags: ["Posts"],
    },
  }
);
