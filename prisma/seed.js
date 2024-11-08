import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Step 1: Delete existing records to avoid duplicates (order matters)
  await prisma.stockMovements.deleteMany();
  await prisma.inventories.deleteMany();
  await prisma.batches.deleteMany();
  await prisma.receptionDetails.deleteMany();
  await prisma.receptions.deleteMany();
  await prisma.orderDetails.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.saleDetails.deleteMany();
  await prisma.sales.deleteMany();
  await prisma.products.deleteMany();
  await prisma.suppliers.deleteMany();
  await prisma.customers.deleteMany();
  await prisma.users.deleteMany();

  console.log("Existing data deleted successfully.");

  // Helper function to hash passwords
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Step 2: Seed Users with hashed passwords
  const user1 = await prisma.users.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: await hashPassword("123456"), // Replace with a secure password
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const user2 = await prisma.users.create({
    data: {
      name: "med",
      email: "med@example.com",
      password: await hashPassword("123"),
      role: "CAISSIER",
      status: "INACTIVE",
    },
  });

  // Step 3: Seed Customers
  const customer1 = await prisma.customers.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      phone: "1234567890",
    },
  });

  // Step 4: Seed Products
  const product1 = await prisma.products.create({
    data: {
      name: "Aspirin",
      description: "Pain relief medication",
      stock: 100,
      sale_price: 10,
      purchase_price: 5,
      threshold: 10,
      prescription_req: false,
      barcode: "123456789",
    },
  });

  // Step 5: Seed Orders
  const order1 = await prisma.orders.create({
    data: {
      order_date: new Date(),
      customerId: customer1.id,
      userId: user1.id,
      details: {
        create: [
          {
            quantity: 2,
            price: 10,
            productId: product1.id,
          },
        ],
      },
    },
  });

  // Step 6: Seed Sales
  const sale1 = await prisma.sales.create({
    data: {
      sale_date: new Date(),
      userId: user1.id,
      customerId: customer1.id,
      details: {
        create: [
          {
            quantity: 1,
            price: 10,
            productId: product1.id,
          },
        ],
      },
    },
  });

  // Step 7: Seed Suppliers
  const supplier1 = await prisma.suppliers.create({
    data: {
      name: "Supplier Inc.",
      address: "456 Supplier St",
      contact: "987654321",
      userId: user2.id,
    },
  });

  // Step 8: Seed Batches
  const batch1 = await prisma.batches.create({
    data: {
      number: "BATCH123",
      quantity: 50,
      expiration_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      productId: product1.id,
    },
  });

  // Step 9: Seed Inventories
  const inventory1 = await prisma.inventories.create({
    data: {
      inventory_date: new Date(),
      stock: 100,
      productId: product1.id,
      userId: user1.id,
    },
  });

  // Step 10: Seed Receptions
  const reception1 = await prisma.receptions.create({
    data: {
      reception_date: new Date(),
      userId: user2.id,
      details: {
        create: [
          {
            quantity: 20,
            price: 5,
            productId: product1.id,
          },
        ],
      },
    },
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
