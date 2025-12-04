import prisma from "../../utils/prisma/prisma.utils";

export class PostService {
  async createPost(user: any, data: { title: string; content?: string }) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content || "",
        authorId: user.id,
      },
    });
  }

  async getPosts() {
    return prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async deletePost(id: string, userId: string) {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) return null;

    if (post.authorId !== userId) return "FORBIDDEN";

    await prisma.post.delete({
      where: { id },
    });

    return true;
  }

  async updatePost(
    id: string,
    userId: string,
    data: { title?: string; content?: string }
  ) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return null;
    if (post.authorId !== userId) return "FORBIDDEN";

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    return updated;
  }
}
