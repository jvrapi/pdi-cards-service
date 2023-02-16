import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1+1 as test_connection`
  } catch (error) {
    throw new Error('Erro ao tentar conectar com o banco de dados')
  }
}
