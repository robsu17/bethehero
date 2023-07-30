"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOngRoutes = void 0;
const prisma_1 = require("../prisma/prisma");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
const checkidexist_1 = require("../middleware/checkidexist");
async function userOngRoutes(app) {
    app.post("/ongs", async (request, reply) => {
        const bodySchema = zod_1.z.object({
            nameOng: zod_1.z.string(),
            email: zod_1.z.string().email(),
            whatsApp: zod_1.z.string(),
            city: zod_1.z.string(),
            uf: zod_1.z.string(),
        });
        const { nameOng, city, email, uf, whatsApp } = bodySchema.parse(request.body);
        const withSameEmail = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (withSameEmail) {
            return reply.status(401).send();
        }
        let sessionId = request.cookies.sessionId;
        if (!sessionId) {
            sessionId = (0, crypto_1.randomUUID)();
            reply.cookie("sessionId", sessionId, {
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }
        try {
            const newUser = await prisma_1.prisma.user.create({
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
        }
        catch (err) {
            console.error(err);
            return reply.status(400).send();
        }
    });
    app.post("/ongs/:ongId/cases", async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            ongId: zod_1.z.string(),
        });
        const caseSchema = zod_1.z.object({
            caseName: zod_1.z.string(),
            description: zod_1.z.string(),
            price: zod_1.z.number(),
        });
        const { ongId } = paramsSchema.parse(request.params);
        const { caseName, description, price } = caseSchema.parse(request.body);
        try {
            const newCase = await prisma_1.prisma.cases.create({
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
                .send(reply
                .code(201)
                .send({ message: "Caso criado com sucesso!", case: newCase }));
        }
        catch (err) {
            console.error(err);
            return reply.status(401).send();
        }
    });
    app.get("/ongs/:ongId", async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            ongId: zod_1.z.string(),
        });
        const paramsCookie = zod_1.z.object({
            sessionId: zod_1.z.string(),
        });
        const { ongId } = paramsSchema.parse(request.params);
        const ong = await prisma_1.prisma.user.findUnique({
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
    app.get("/ongs/:ongId/cases", { preHandler: [checkidexist_1.checkSessionIdExist] }, async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            ongId: zod_1.z.string(),
        });
        const { ongId } = paramsSchema.parse(request.params);
        const cases = await prisma_1.prisma.cases.findMany({
            where: {
                userOng_id: parseInt(ongId),
            },
        });
        return reply.status(200).send(cases);
    });
    app.get("/ongs", { preHandler: [checkidexist_1.checkSessionIdExist] }, async (request, reply) => {
        const { sessionId } = request.cookies;
        const users = await prisma_1.prisma.user.findMany({
            where: {
                sessionId,
            },
        });
        return reply.status(200).send(users);
    });
    app.delete("/ongs/:ongId/cases/:caseId", async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            ongId: zod_1.z.string(),
            caseId: zod_1.z.string(),
        });
        const { caseId } = paramsSchema.parse(request.params);
        await prisma_1.prisma.cases.delete({
            where: {
                id: parseInt(caseId),
            },
        });
        return reply.status(200).send();
    });
}
exports.userOngRoutes = userOngRoutes;
