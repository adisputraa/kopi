import { prisma } from "../configs/prisma";

export async function findAll() {
  return prisma.users.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });
}

export async function findById(id: string) {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });
}

export async function createUser(
  username: string,
  name: string,
  email: string,
  password: string
) {
  return prisma.users.create({
    data: {
      username,
      name,
      email,
      password,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: { username },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function updateUserPassword(userId:string, hashedPassword:string) {
  return await prisma.users.update({
    where: {id: userId},
    data: {password: hashedPassword}
  });
}