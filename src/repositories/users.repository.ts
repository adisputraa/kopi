import { prisma } from "../configs/prisma";
import { Prisma } from "../generated/prisma"; 


// ===============================================
// Fungsi yang sudah ada
// ===============================================
export async function findAll() {
  return await prisma.users.findMany();
}

export async function findById(id: string) {
  return await prisma.users.findUnique({
    where: { id },
  });
}


// ===============================================
// Fungsi baru untuk fitur Autentikasi
// ===============================================
export async function createUser(data: Prisma.usersCreateInput) {
  return await prisma.users.create({
    data,
    // 'select' memastikan kita tidak pernah mengembalikan hash password
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
  return await prisma.users.findUnique({
    where: { username },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: { email },
  });
}