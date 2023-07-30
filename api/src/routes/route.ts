import { FastifyInstance } from "fastify";
import { prisma } from "../prisma/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkSessionIdExist } from "../middleware/checkidexist";

export async function userOngRoutes(app: FastifyInstance) {
  app.post("/ongs", async (request, reply) => {
    const bodySchema = z.object({
      nameOng: z.string(),
      email: z.string().email(),
      whatsApp: z.string(),
      city: z.string(),
      uf: z.string(),
    });

    const { nameOng, city, email, uf, whatsApp } = bodySchema.parse(
      request.body
    );

    const withSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (withSameEmail) {
      return reply.status(401).send();
    }

    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name_ong: nameOng,
          city,
          email,
          uf,
          whatsApp,
          sessionId,
        },
      });

      return reply
        .status(201)
        .send({ message: "Ong criada com sucesso!", case: newUser });
    } catch (err) {
      console.error(err);
      return reply.status(400).send();
    }
  });

  app.post("/ongs/:ongId/cases", async (request, reply) => {
    const paramsSchema = z.object({
      ongId: z.string(),
    });

    const caseSchema = z.object({
      caseName: z.string(),
      description: z.string(),
      price: z.number(),
    });

    const { ongId } = paramsSchema.parse(request.params);

    const { caseName, description, price } = caseSchema.parse(request.body);

    try {
      const newCase = await prisma.cases.create({
        data: {
          case: caseName,
          description,
          price,
          user: {
            connect: { ong_id: parseInt(ongId) },
          },
        },
      });

      return reply
        .status(201)
        .send(
          reply
            .code(201)
            .send({ message: "Caso criado com sucesso!", case: newCase })
        );
    } catch (err) {
      console.error(err);
      return reply.status(401).send();
    }
  });

  app.get("/ongs/:ongId", async (request, reply) => {
    const paramsSchema = z.object({
      ongId: z.string(),
    });

    const paramsCookie = z.object({
      sessionId: z.string(),
    });

    const { ongId } = paramsSchema.parse(request.params);

    const ong = await prisma.user.findUnique({
      where: {
        ong_id: parseInt(ongId),
      },
    });

    const { sessionId } = paramsCookie.parse(ong);

    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      ong,
    };
  });

  app.get(
    "/ongs/:ongId/cases",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const paramsSchema = z.object({
        ongId: z.string(),
      });

      const { ongId } = paramsSchema.parse(request.params);

      const cases = await prisma.cases.findMany({
        where: {
          userOng_id: parseInt(ongId),
        },
      });

      return reply.status(200).send(cases);
    }
  );

  app.get(
    "/ongs",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const users = await prisma.user.findMany({
        where: {
          sessionId,
        },
      });
      return reply.status(200).send(users);
    }
  );

  app.delete("/ongs/:ongId/cases/:caseId", async (request, reply) => {
    const paramsSchema = z.object({
      ongId: z.string(),
      caseId: z.string(),
    });

    const { caseId } = paramsSchema.parse(request.params);

    await prisma.cases.delete({
      where: {
        id: parseInt(caseId),
      },
    });

    return reply.status(200).send();
  });
}
