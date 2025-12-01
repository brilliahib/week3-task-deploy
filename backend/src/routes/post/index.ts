import Elysia from "elysia";
import { getPosts } from "./getPosts";
import { createPostRoute } from "./createPost";
import { updatePostRoute } from "./updatePost";
import { deletePostRoute } from "./deletePost";
import { getMyPosts } from "./getMyPost";

export const post = new Elysia({
  prefix: "/post",
})
  .use(getPosts)
  .use(createPostRoute)
  .use(updatePostRoute)
  .use(deletePostRoute)
  .use(getMyPosts);
