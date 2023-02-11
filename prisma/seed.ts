import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  await prisma.artist.upsert({
    where: { id: '6zlR5ttMfMNmwf2lecU9Cc' },
    update: {},
    create: {
      id: '6zlR5ttMfMNmwf2lecU9Cc',
      name: 'Sam Fender',
    },
  });
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
