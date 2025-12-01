import Elysia from "elysia";
import { getCommentsByPostId } from "./getComment";
import { createCommentRoute } from "./createComment";
import { updateCommentRoute } from "./updateComment";
import { deleteCommentRoute } from "./deleteComment";

export const comment = new Elysia({
  prefix: "/comment",
})
  .use(getCommentsByPostId)
  .use(createCommentRoute)
  .use(updateCommentRoute)
  .use(deleteCommentRoute);
