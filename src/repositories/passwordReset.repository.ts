import { prisma } from "../configs/prisma";

export async function createResetToken(userId:string, token:string, expiresAt:Date) {
    return await prisma.passwordResetToken.create({
        data: {
            userId,
            token, 
            expiresAt,
        },
    });
}

export async function findResetToken(token:string) {
    return await prisma.passwordResetToken.findUnique({
        where: { token },
    });
}

export async function deleteResetToken(id:string) {
    return await prisma.passwordResetToken.delete({
        where: { id },
    });
}