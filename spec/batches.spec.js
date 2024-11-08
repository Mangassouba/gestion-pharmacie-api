// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests du Modèle Batches", () => {
//   let batchId = null;

//   beforeAll(() => {
//     spyOn(prisma.batches, "create").and.callFake(async (data) => {
//       return {
//         id: 1,
//         number: data.data.number,
//         quantity: data.data.quantity,
//         expiration_date: data.data.expiration_date,
//         productId: data.data.productId,
//       };
//     });
//     spyOn(prisma.batches, "update").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return {
//           id: 1,
//           number: data.data.number,
//           quantity: data.data.quantity,
//           expiration_date: data.data.expiration_date,
//           productId: data.data.productId,
//         };
//       } else {
//         throw new Error("Batch not found");
//       }
//     });
//     spyOn(prisma.batches, "findMany").and.callFake(async () => {
//       return [
//         {
//           id: 1,
//           number: "BATCH001",
//           quantity: 100,
//           expiration_date: new Date("2024-12-31"),
//           productId: 1,
//         },
//       ];
//     });
//     spyOn(prisma.batches, "delete").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return { id: 1 };
//       } else {
//         throw new Error("Batch not found");
//       }
//     });
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   // Test de création d'un batch
//   it("can be created", async () => {
//     const batch = {
//       number: "BATCH001",
//       quantity: 100,
//       expiration_date: new Date("2024-12-31"),
//       productId: 1,
//     };

//     const result = await prisma.batches.create({
//       data: batch,
//     });

//     batchId = result.id;
//     expect(result).not.toBeNull();
//     expect(result.number).toBe(batch.number);
//     expect(result.quantity).toBe(batch.quantity);
//     expect(result.expiration_date).toEqual(batch.expiration_date);
//     expect(result.productId).toBe(batch.productId);
//   });

//   // Test de mise à jour d'un batch
//   it("can be updated", async () => {
//     const updatedBatch = {
//       number: "BATCH002",
//       quantity: 150,
//       expiration_date: new Date("2025-01-31"),
//       productId: 1,
//     };

//     const result = await prisma.batches.update({
//       where: { id: batchId },
//       data: updatedBatch,
//     });

//     expect(result.number).toBe(updatedBatch.number);
//     expect(result.quantity).toBe(updatedBatch.quantity);
//     expect(result.expiration_date).toEqual(updatedBatch.expiration_date);
//     expect(result.productId).toBe(updatedBatch.productId);
//   });

//   it("fails to update a batch that does not exist", async () => {
//     const invalidId = 999999;
//     const updatedBatch = {
//       number: "INVALIDBATCH",
//       quantity: 200,
//       expiration_date: new Date("2025-06-30"),
//     };

//     try {
//       await prisma.batches.update({
//         where: { id: invalidId },
//         data: updatedBatch,
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   // Test de récupération de tous les batches
//   it("can get all batches", async () => {
//     const allBatches = await prisma.batches.findMany();

//     expect(allBatches).not.toBeNull();
//     expect(allBatches.length).toBeGreaterThan(0);
//   });

//   // Test de suppression d'un batch
//   it("can be deleted", async () => {
//     const result = await prisma.batches.delete({
//       where: { id: batchId },
//     });

//     expect(result.id).toEqual(batchId);
//   });

//   it("fails to delete a batch that does not exist", async () => {
//     const invalidId = 999999;

//     try {
//       await prisma.batches.delete({
//         where: { id: invalidId },
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
