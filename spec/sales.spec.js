// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// describe("Tests CRUD pour le Modèle Sales", () => {
//   let saleId;
//   let customerId;
//   let userId; // Ajoutez un utilisateur si nécessaire

//   beforeAll(async () => {
//     // Création d'un client factice pour tester la relation
//     const customer = await prisma.customers.create({
//       data: {
//         firstName: "Test",
//         lastName: "Client",
//         address: "123 Rue Test",
//         phone: "123456789"
//       }
//     });
//     customerId = customer.id;

//     // Si le champ `userId` est requis, créez un utilisateur
//     const user = await prisma.users.create({
//       data: {
//         name: "Test User",
//         email: "test@example.com",
//         password: "password", // Assurez-vous que cela correspond au schéma
//         role: "admin",
//         status: "active"
//       }
//     });
//     userId = user.id;
//   });

//   afterAll(async () => {
//     await prisma.saleDetails.deleteMany();
//     await prisma.sales.deleteMany();
//     await prisma.customers.deleteMany();
//     await prisma.users.deleteMany();
//     await prisma.$disconnect();
//   });

//   it("devrait créer une vente avec des détails", async () => {
//     const saleData = {
//       sale_date: new Date("2024-10-26T00:00:00Z"),
//       customerId: customerId,
//       userId: userId, // Utilisez un utilisateur valide
//       details: {
//         create: [
//           {
//             productId: 1,
//             quantity: 10,
//             price: 20
//           }
//         ]
//       }
//     };

//     const sale = await prisma.sales.create({
//       data: saleData,
//       include: { details: true }
//     });

//     saleId = sale.id;

//     expect(sale).toBeDefined();
//     expect(sale.details.length).toBe(1);
//     expect(sale.details[0].quantity).toBe(10);
//   });

//   it("devrait récupérer une vente par son ID", async () => {
//     if (!saleId) throw new Error("Sale ID est indéfini");

//     const sale = await prisma.sales.findUnique({
//       where: { id: saleId },
//       include: { details: true }
//     });

//     expect(sale).toBeDefined();
//     expect(sale.id).toBe(saleId);
//     expect(sale.details.length).toBe(1);
//     expect(sale.details[0].productId).toBe(1);
//   });

//   it("devrait mettre à jour la quantité dans les détails de la vente", async () => {
//     if (!saleId) throw new Error("Sale ID est indéfini");

//     const updatedDetails = await prisma.saleDetails.updateMany({
//       where: { saleId: saleId },
//       data: { quantity: 15 }
//     });

//     expect(updatedDetails.count).toBe(1);

//     const sale = await prisma.sales.findUnique({
//       where: { id: saleId },
//       include: { details: true }
//     });

//     expect(sale.details[0].quantity).toBe(15);
//   });

//   it("devrait supprimer la vente et ses détails associés", async () => {
//     if (!saleId) throw new Error("Sale ID est indéfini");

//     const deletedSale = await prisma.sales.delete({
//       where: { id: saleId }
//     });

//     expect(deletedSale.id).toBe(saleId);

//     const remainingDetails = await prisma.saleDetails.findMany({
//       where: { saleId: saleId }
//     });

//     expect(remainingDetails.length).toBe(0);
//   });
// });
