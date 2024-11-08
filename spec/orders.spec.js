// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests Modèle Orders", () => {
//   let orderId = null;

//   afterAll(async () => {
//     // Nettoyage de la base de données après tous les tests
//     await prisma.orderDetails.deleteMany();
//     await prisma.orders.deleteMany();
//     await prisma.$disconnect();
//   });

//   it("Créer une commande avec des détails", async () => {
//     // Données pour la création de la commande
//     const orderData = {
//       order_date: new Date("2024-10-26T00:00:00.000Z"),
//       customerId: 3,
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

//     // Création de la commande avec les détails
//     const order = await prisma.orders.create({
//       data: orderData,
//       include: { details: true }
//     });

//     orderId = order.id;

//     // Vérifications
//     expect(order).toBeDefined();
//     expect(order.customerId).toBe(3);
//     expect(order.details.length).toBe(1);
//     expect(order.details[0].productId).toBe(1);
//   });

//   it("Récupérer une commande par son ID", async () => {
//     const order = await prisma.orders.findUnique({
//       where: { id: orderId },
//       include: { details: true }
//     });

//     expect(order).toBeDefined();
//     expect(order.id).toBe(orderId);
//     expect(order.details.length).toBe(1);
//   });

//   it("Mettre à jour la quantité dans les détails de la commande", async () => {
//     const updatedOrder = await prisma.orderDetails.updateMany({
//       where: { orderId: orderId },
//       data: { quantity: 15 }
//     });

//     expect(updatedOrder.count).toBe(1);

//     // Vérifie que la quantité a été mise à jour
//     const order = await prisma.orders.findUnique({
//       where: { id: orderId },
//       include: { details: true }
//     });

//     expect(order.details[0].quantity).toBe(15);
//   });

//   it("Supprimer la commande et ses détails associés", async () => {
//     // Suppression de la commande
//     const deleteOrder = await prisma.orders.delete({
//       where: { id: orderId }
//     });

//     expect(deleteOrder.id).toBe(orderId);

//     // Vérification que les détails de commande sont également supprimés
//     const orderDetails = await prisma.orderDetails.findMany({
//       where: { orderId: orderId }
//     });

//     expect(orderDetails.length).toBe(0);
//   });
// });
