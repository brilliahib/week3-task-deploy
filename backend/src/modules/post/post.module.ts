import { Elysia, t } from "elysia";
import { PostController } from "./post.controller";
import { getUserFromJWT } from "../../utils/user/get-user.utils";
import jwt from "@elysiajs/jwt";

export const PostModule = new Elysia({ prefix: "/posts" })
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

      return PostController.createPost(body, user, set);
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
    }
  )

  .get(
    "/",
    async ({ query }) => {
      return PostController.getPosts();
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
  )

  .get(
    "/:id",
    async ({ params, set }) => {
      return PostController.getPostById(params.id, set);
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Get Post By ID",
        description: "Retrieve a post by ID.",
        tags: ["Posts"],
      },
    }
  )

  .put(
    "/:id",
    async ({ jwt, headers, params, body, set }) => {
      const user = await getUserFromJWT(jwt, headers, set);
      if (!user) return { error: "Unauthorized" };

      return PostController.updatePost(params.id, user, body, set);
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        content: t.Optional(t.String()),
      }),
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Update Post",
        description: "Update post title or content.",
        tags: ["Posts"],
      },
    }
  )

  .delete(
    "/:id",
    async ({ jwt, headers, params, set }) => {
      const user = await getUserFromJWT(jwt, headers, set);
      if (!user) return { error: "Unauthorized" };

      return PostController.deletePost(params.id, user, set);
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
    }
  );
