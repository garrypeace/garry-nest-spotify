import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  const artist = await prisma.artist.upsert({
    where: { id: '' }, // TODO
    update: {},
    create: {
      id: '', // TODO
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
