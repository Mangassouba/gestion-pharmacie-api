// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests Modèle Receptions", () => {
//   let receptionId = null;

//   afterAll(async () => {
//     // Nettoyage de la base de données après tous les tests
//     await prisma.receptionDetails.deleteMany();
//     await prisma.receptions.deleteMany();
//     await prisma.$disconnect();
//   });

//   it("Réception avec des détails", async () => {
//     const receptionData = {
//       reception_date: new Date("2024-10-25T10:00:00Z"),
//       userId: null, // Assurez-vous d'ajouter l'ID utilisateur si nécessaire
//       details: {
//         create: [
//           {
//             productId: 6,
//             quantity: 50,
//             price: 100
//           }
//         ]
//       }
//     };

//     const reception = await prisma.receptions.create({
//       data: receptionData,
//       include: { details: true }
//     });

//     receptionId = reception.id;

//     // Vérifications
//     expect(reception).toBeDefined();
//     expect(reception.reception_date).toEqual(new Date("2024-10-25T10:00:00Z"));
//     expect(reception.details.length).toBe(1);
//     expect(reception.details[0].quantity).toBe(50);
//   });

//   it("Récupérer une réception par son ID", async () => {
//     const reception = await prisma.receptions.findUnique({
//       where: { id: receptionId },
//       include: { details: true }
//     });

//     expect(reception).toBeDefined();
//     expect(reception.id).toBe(receptionId);
//     expect(reception.details.length).toBe(1);
//     expect(reception.details[0].productId).toBe(6);
//   });

//   it("Mettre à jour la quantité dans les détails de la réception", async () => {
//     const updatedDetails = await prisma.receptionDetails.updateMany({
//       where: { receptionId: receptionId },
//       data: { quantity: 60 }
//     });

//     expect(updatedDetails.count).toBe(1);

//     const reception = await prisma.receptions.findUnique({
//       where: { id: receptionId },
//       include: { details: true }
//     });

//     expect(reception.details[0].quantity).toBe(60);
//   });

//   it("Supprimer la réception et ses détails associés", async () => {
//     const deletedReception = await prisma.receptions.delete({
//       where: { id: receptionId }
//     });

//     expect(deletedReception.id).toBe(receptionId);

//     const remainingDetails = await prisma.receptionDetails.findMany({
//       where: { receptionId: receptionId }
//     });

//     expect(remainingDetails.length).toBe(0);
//   });
// });
