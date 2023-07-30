"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionIdExist = void 0;
async function checkSessionIdExist(request, reply) {
    const sessionId = request.cookies.sessionId;
    if (!sessionId) {
        return reply.status(401).send({
            error: "Unauthorized",
        });
    }
    return sessionId;
}
exports.checkSessionIdExist = checkSessionIdExist;
