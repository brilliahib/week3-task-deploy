import { fail, ok } from "../../utils/responses/response.util";
import { PostService } from "./post.service";

const postService = new PostService();

export const PostController = {
  async createPost(body: any, user: any, set: any) {
    try {
      const post = await postService.createPost(user, body);

      set.status = 201;
      return ok("Post created successfully", post);
    } catch (error) {
      console.error(error);
      set.status = 500;
      return fail("Failed to create post");
    }
  },

  async getPosts() {
    try {
      const posts = await postService.getPosts();
      return ok("Posts fetched successfully", posts);
    } catch (error) {
      console.error(error);
      return fail("Failed to fetch posts");
    }
  },

  async getPostById(id: string, set?: any) {
    try {
      const post = await postService.getPostById(id);

      if (!post) {
        set && (set.status = 404);
        return fail("Post not found");
      }

      return ok("Post fetched successfully", post);
    } catch (error) {
      console.error(error);
      set && (set.status = 500);
      return fail("Failed to fetch post");
    }
  },

  async deletePost(id: string, user: any, set: any) {
    try {
      const deleted = await postService.deletePost(id, user.id);

      if (!deleted) {
        set.status = 403;
        return fail("You are not allowed to delete this post");
      }

      return ok("Post deleted successfully");
    } catch (error) {
      console.error(error);
      set.status = 500;
      return fail("Failed to delete post");
    }
  },

  async updatePost(id: string, user: any, body: any, set: any) {
    try {
      const updated = await postService.updatePost(id, user.id, body);

      if (!updated) {
        set.status = 403;
        return fail("You are not allowed to update this post");
      }

      return ok("Post updated successfully", updated);
    } catch (error) {
      console.error(error);
      set.status = 500;
      return fail("Failed to update post");
    }
  },
};
