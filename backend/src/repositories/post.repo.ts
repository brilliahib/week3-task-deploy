import { PaginationParams, Prisma, prisma } from "libs";

interface FindPostParams {
  search?: string;
}

interface FindPostParamsWithPagination
  extends FindPostParams,
    PaginationParams {}

const postSelect = {
  id: true,
  title: true,
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
};

export const findPostsCount = async ({ search }: FindPostParams) => {
  return prisma.post.count({
    where: {
      OR: search
        ? [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    },
  });
};

export const findPosts = async ({
  search,
  page,
  take,
}: FindPostParamsWithPagination) => {
  return prisma.post.findMany({
    where: {
      OR: search
        ? [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    },
    take,
    skip: (page - 1) * take,
    select: postSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const findPostById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    select: postSelect,
  });
};

export const createPost = async (data: Prisma.PostCreateInput) => {
  return prisma.post.create({
    data,
    select: postSelect,
  });
};

export const updatePostById = (id: string, data: Prisma.PostUpdateInput) => {
  return prisma.post
    .update({
      where: { id },
      data,
    })
    .catch(() => null);
};

export const deletePostById = (id: string) => {
  return prisma.post
    .delete({
      where: { id },
    })
    .catch(() => null);
};

export const findPostsByAuthor = async ({
  authorId,
  search,
  page,
  take,
}: {
  authorId: string;
  search?: string;
  page: number;
  take: number;
}) => {
  return prisma.post.findMany({
    where: {
      authorId,
      OR: search
        ? [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    },
    skip: (page - 1) * take,
    take,
    select: postSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const findPostsByAuthorCount = async ({
  authorId,
  search,
}: {
  authorId: string;
  search?: string;
}) => {
  return prisma.post.count({
    where: {
      authorId,
      OR: search
        ? [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
    },
  });
};
