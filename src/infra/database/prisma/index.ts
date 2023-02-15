import { PrismaClient } from '@prisma/client';
import { logger } from '@utils/logger';

export const prisma = new PrismaClient();

export async function testConnection(){
  try {
    await prisma.$queryRaw`SELECT 1+1 as test_connection`
  } catch (error) {
    logger.error('Erro ao tentar conectar com o banco de dados')
  }
}
