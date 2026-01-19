const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function practice() {
  
  // Exercise 1: Add 3 users
  console.log('--- Exercise 1: Adding users ---');
  await prisma.user.create({ data: { name: 'Alice', email: 'alice@test.com' }});
  await prisma.user.create({ data: { name: 'Bob', email: 'bob@test.com' }});
  await prisma.user.create({ data: { name: 'Charlie', email: 'charlie@test.com' }});
  console.log('✅ Added 3 users\n');
  
  // Exercise 2: Show all users
  console.log('--- Exercise 2: All users ---');
  const all = await prisma.user.findMany();
  console.log(all);
  console.log(`Total: ${all.length} users\n`);
  
  // Exercise 3: Find Bob
  console.log('--- Exercise 3: Find Bob ---');
  const bob = await prisma.user.findUnique({
    where: { email: 'bob@test.com' }
  });
  console.log(bob);
  console.log('');
  
  // Exercise 4: Change Alice's name
  console.log('--- Exercise 4: Update Alice ---');
  const updated = await prisma.user.update({
    where: { email: 'alice@test.com' },
    data: { name: 'Alice Johnson' }
  });
  console.log(updated);
  console.log('');
  
  // Exercise 5: Delete Charlie
  console.log('--- Exercise 5: Delete Charlie ---');
  await prisma.user.delete({
    where: { email: 'charlie@test.com' }
  });
  console.log('✅ Charlie deleted\n');
  
  // Exercise 6: Show remaining users
  console.log('--- Exercise 6: Remaining users ---');
  const remaining = await prisma.user.findMany();
  console.log(remaining);
}

practice()
  .catch(console.error)
  .finally(() => prisma.$disconnect());