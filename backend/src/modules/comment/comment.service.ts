import prisma from "../../utils/prisma/prisma.utils";

export class CommentService {
  async createComment(user: any, data: { postId: string; content: string }) {
    return prisma.comment.create({
      data: {
        postId: data.postId,
        content: data.content,
        authorId: user.id,
      },
    });
  }

  async getCommentsByPost(postId: string) {
    return prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: "asc" },
    });
  }

  async updateComment(commentId: string, userId: string, content: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.authorId !== userId) {
      throw new Error("Unauthorized or comment not found");
    }

    return prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.authorId !== userId) {
      throw new Error("Unauthorized or comment not found");
    }

    return prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
