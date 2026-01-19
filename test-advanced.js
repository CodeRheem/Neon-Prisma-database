const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabase() {
  console.log('🧪 Testing Neon Database...\n');

  // Test 1: Create a user
  console.log('Test 1: Creating a user...');
  const user1 = await prisma.user.create({
    data: {
      email: `alice${Date.now()}@example.com`,
      name: 'Alice Johnson'
    }
  });
  console.log('✅ Created:', user1);

  // Test 2: Find a specific user by email
  console.log('\nTest 2: Finding user by email...');
  const foundUser = await prisma.user.findUnique({
    where: { email: user1.email }
  });
  console.log('✅ Found:', foundUser);

  // Test 3: Count all users
  console.log('\nTest 3: Counting all users...');
  const count = await prisma.user.count();
  console.log(`✅ Total users in database: ${count}`);

  // Test 4: Get all users
  console.log('\nTest 4: Getting all users...');
  const allUsers = await prisma.user.findMany();
  console.log('✅ All users:', allUsers);

  // Test 5: Update a user
  console.log('\nTest 5: Updating user...');
  const updatedUser = await prisma.user.update({
    where: { id: user1.id },
    data: { name: 'Alice Smith' }
  });
  console.log('✅ Updated:', updatedUser);

  // Test 6: Delete a user
  console.log('\nTest 6: Deleting user...');
  await prisma.user.delete({
    where: { id: user1.id }
  });
  console.log('✅ Deleted user with id:', user1.id);

  // Test 7: Final count
  const finalCount = await prisma.user.count();
  console.log(`\n✅ Final user count: ${finalCount}`);
}

testDatabase()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n👋 Disconnected from database');
  });