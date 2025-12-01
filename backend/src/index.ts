import { Elysia } from "elysia";
import { auth, comment, post } from "./routes";
import swagger from "@elysiajs/swagger";

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
  .group("/api", (app) =>
    app.group("/v1", (app) => app.use(auth).use(post).use(comment))
  )
  .get("/", () => "Hello Elysia");

export default app;
