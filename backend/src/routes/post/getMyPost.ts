import Elysia, { t } from "elysia";
import { isAuthenticated } from "middlewares";
import {
  findPostsByAuthor,
  findPostsByAuthorCount,
} from "repositories/post.repo";

export const getMyPosts = new Elysia().use(isAuthenticated).get(
  "/me",
  async ({ user, query, set }) => {
    const authorId = user!.id;

    const page = Number(query.page) || 1;
    const take = Number(query.take) || 10;
    const search = query.search as string | undefined;

    const [total, posts] = await Promise.all([
      findPostsByAuthorCount({ authorId, search }),
      findPostsByAuthor({ authorId, search, page, take }),
    ]);

    set.status = 200;
    return {
      success: true,
      message: "Posts retrieved for current user",
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
      summary: "Get My Posts",
      description:
        "Retrieve posts created by the currently authenticated user.",
      tags: ["Posts"],
    },
  }
);
