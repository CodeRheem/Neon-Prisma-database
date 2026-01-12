const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing Neon + Prisma...\n');

  const newUser = await prisma.user.create({
    data: {
      email: 'test' + Date.now() + '@example.com',
      name: 'Test User'
    }
  });
  console.log('✅ Created user:', newUser);

  const allUsers = await prisma.user.findMany();
  console.log('\n📋 All users:', allUsers);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });