import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Roles
  const rolesData = [
    { name: 'Administrator', description: 'Full access to all resources' },
    { name: 'Editor', description: 'Can edit content but not manage users' },
    { name: 'Viewer', description: 'Read-only access' },
    { name: 'Approver', description: 'Can approve seller applications and products' },
    { name: 'Product Manager', description: 'Manage products and categories' },
    { name: 'Seller Manager', description: 'Manage seller applications' },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // 2. Create Admin User
  const adminEmail = 'admin@woodzon.com';
  const adminPassword = await bcrypt.hash('admin123', 10);

  const adminRole = await prisma.role.findUnique({ where: { name: 'Administrator' } });

  if (adminRole) {
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: adminPassword,
        firstName: 'Super',
        lastName: 'Admin',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        roles: {
          connect: { id: adminRole.id },
        },
      },
    });
    console.log({ admin });
  }

  // 3. Create Sample Categories
  const categories = [
    { name: 'Furniture', slug: 'furniture', description: 'Home and Office Furniture' },
    { name: 'Decor', slug: 'decor', description: 'Home Decor Items' },
    { name: 'Lighting', slug: 'lighting', description: 'Lamps and Lights' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
