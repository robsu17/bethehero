"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/route.ts
var route_exports = {};
__export(route_exports, {
  userOngRoutes: () => userOngRoutes
});
module.exports = __toCommonJS(route_exports);

// src/prisma/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/route.ts
var import_zod = require("zod");
var import_crypto = require("crypto");

// src/middleware/checkidexist.ts
async function checkSessionIdExist(request, reply) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized"
    });
  }
  return sessionId;
}

// src/routes/route.ts
async function userOngRoutes(app) {
  app.post("/ongs", async (request, reply) => {
    const bodySchema = import_zod.z.object({
      nameOng: import_zod.z.string(),
      email: import_zod.z.string().email(),
      whatsApp: import_zod.z.string(),
      city: import_zod.z.string(),
      uf: import_zod.z.string()
    });
    const { nameOng, city, email, uf, whatsApp } = bodySchema.parse(
      request.body
    );
    const withSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (withSameEmail) {
      return reply.status(401).send();
    }
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = (0, import_crypto.randomUUID)();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1e3 * 60 * 60 * 24 * 7
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
          sessionId
        }
      });
      return reply.status(201).send({ message: "Ong criada com sucesso!", case: newUser });
    } catch (err) {
      console.error(err);
      return reply.status(400).send();
    }
  });
  app.post("/ongs/:ongId/cases", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      ongId: import_zod.z.string()
    });
    const caseSchema = import_zod.z.object({
      caseName: import_zod.z.string(),
      description: import_zod.z.string(),
      price: import_zod.z.number()
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
            connect: { ong_id: parseInt(ongId) }
          }
        }
      });
      return reply.status(201).send(
        reply.code(201).send({ message: "Caso criado com sucesso!", case: newCase })
      );
    } catch (err) {
      console.error(err);
      return reply.status(401).send();
    }
  });
  app.get("/ongs/:ongId", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      ongId: import_zod.z.string()
    });
    const paramsCookie = import_zod.z.object({
      sessionId: import_zod.z.string()
    });
    const { ongId } = paramsSchema.parse(request.params);
    const ong = await prisma.user.findUnique({
      where: {
        ong_id: parseInt(ongId)
      }
    });
    const { sessionId } = paramsCookie.parse(ong);
    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    return {
      ong
    };
  });
  app.get(
    "/ongs/:ongId/cases",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const paramsSchema = import_zod.z.object({
        ongId: import_zod.z.string()
      });
      const { ongId } = paramsSchema.parse(request.params);
      const cases = await prisma.cases.findMany({
        where: {
          userOng_id: parseInt(ongId)
        }
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
          sessionId
        }
      });
      return reply.status(200).send(users);
    }
  );
  app.delete("/ongs/:ongId/cases/:caseId", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      ongId: import_zod.z.string(),
      caseId: import_zod.z.string()
    });
    const { caseId } = paramsSchema.parse(request.params);
    await prisma.cases.delete({
      where: {
        id: parseInt(caseId)
      }
    });
    return reply.status(200).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userOngRoutes
});
