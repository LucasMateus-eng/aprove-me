import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy assignors
  const assignor1 = await prisma.assignor.upsert({
    where: { document: '052.093.268-45' },
    update: {},
    create: {
      document: '052.093.268-45',
      email: 'erick_caldeira@cntbrasil.com.br',
      phone: '(43) 99492-0047',
      name: 'Erick Sebastião Caldeira',
    },
  });

  const assignor2 = await prisma.assignor.upsert({
    where: { document: '223.656.844-40' },
    update: {},
    create: {
      document: '223.656.844-40',
      email: 'priscila_alicia_vieira@valepur.com.br',
      phone: '(79) 99326-0361',
      name: 'Priscila Alícia Louise Vieira',
    },
  });

  console.log({ assignor1, assignor2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
