import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authMiddleware = new Elysia({ name: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .derive(async ({ jwt, headers, set, request }) => {
    const authorization = headers.authorization;

    if (!authorization) {
      set.status = 401;
      throw new Error("Unauthorized: Authorization header not provided");
    }

    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;

    if (!token) {
      set.status = 401;
      throw new Error("Unauthorized: Token not provided");
    }

    try {
      const payload = await jwt.verify(token);

      if (!payload) {
        set.status = 401;
        throw new Error("Unauthorized: Token is invalid or expired");
      }

      return {
        user: payload as { id: number; role: string; name: string },
      };
    } catch (error) {
      set.status = 401;
      throw new Error("Unauthorized: Token verification failed");
    }
  });
