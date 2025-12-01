import { Prisma, prisma } from "libs";

const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  post: {
    select: {
      id: true,
      title: true,
    },
  },
};

export const findCommentsByPostId = async (postId: string) => {
  return prisma.comment.findMany({
    where: { postId },
    select: commentSelect,
    orderBy: { createdAt: "asc" },
  });
};

export const createComment = async (data: Prisma.CommentCreateInput) => {
  return prisma.comment.create({
    data,
    select: commentSelect,
  });
};

export const findCommentById = async (id: string) => {
  return prisma.comment.findUnique({
    where: { id },
    select: commentSelect,
  });
};

export const updateCommentById = (
  id: string,
  data: Prisma.CommentUpdateInput
) => {
  return prisma.comment
    .update({
      where: { id },
      data,
    })
    .catch(() => null);
};

export const deleteCommentById = (id: string) => {
  return prisma.comment
    .delete({
      where: { id },
    })
    .catch(() => null);
};
