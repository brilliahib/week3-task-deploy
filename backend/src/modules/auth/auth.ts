import { Elysia, t } from "elysia";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma/prisma.utils";
import jwt from "@elysiajs/jwt";
import { fail, ok } from "../../utils/responses/response.util";

export const authModule = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )

  .post(
    "/register",
    async ({ body, set }) => {
      const { name, email, password } = body;

      const exist = await prisma.user.findUnique({ where: { email } });
      if (exist) {
        set.status = 400;
        return fail("Email has been registered");
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hashed },
      });

      return ok("Registration successful", user);
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        summary: "Register User",
        description: "Create a new user account.",
        tags: ["Auth"],
      },
    }
  )

  .post(
    "/login",
    async ({ body, jwt, set }) => {
      const { email, password } = body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        set.status = 400;
        return fail("Email not found");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        set.status = 400;
        return fail("Incorrect password");
      }

      const token = await jwt.sign({
        id: user.id,
        name: user.name,
        role: "user",
      });

      return ok("Login successful", { token });
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        summary: "Login User",
        description: "Log in and receive JWT token.",
        tags: ["Auth"],
      },
    }
  );
