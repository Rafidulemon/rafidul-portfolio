import { PrismaClient } from '@prisma/client';
import seedUsers from './userSeed.js';

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
