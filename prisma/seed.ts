import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  await prisma.artist.createMany({
    data: [
      {
        id: '6zlR5ttMfMNmwf2lecU9Cc',
        name: 'Sam Fender',
        followers: 709178,
        popularity: 71,
      },
      {
        id: '2ye2Wgw4gimLv2eAKyk1NB',
        name: 'Metallica',
        followers: 23749055,
        popularity: 84,
      },
      {
        id: '2rlKFCYdklMm9prcYLdvp6',
        name: 'Mr Bean',
        followers: 9050,
        popularity: 26,
      },
    ],
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
