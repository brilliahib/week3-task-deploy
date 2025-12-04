import { Elysia } from "elysia";
import { PostModule } from "./modules/post/post.module";
import { CommentModule } from "./modules/comment/comment.module";
import swagger from "@elysiajs/swagger";
import { authModule } from "./modules/auth/auth";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Simple Forum Backend",
          description: "API documentation for Simple Forum Backend",
          version: "1.0.0",
        },
        tags: [
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Posts", description: "Posts CRUD endpoints" },
          { name: "Comments", description: "Comments CRUD endpoints" },
        ],
      },
    })
  )
  .get("/", () => "Welcome to the Forum API")
  .use(authModule)
  .use(PostModule)
  .use(CommentModule)
  .listen(9000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

export default app;
