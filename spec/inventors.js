// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests du Modèle Inventories", () => {
//   let inventoryId = null;

//   beforeAll(() => {
//     spyOn(prisma.inventories, "create").and.callFake(async (data) => {
//       return {
//         id: 1,
//         inventory_date: data.data.inventory_date,
//         stock: data.data.stock,
//         productId: data.data.productId,
//         userId: data.data.userId,
//       };
//     });
//     spyOn(prisma.inventories, "update").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return {
//           id: 1,
//           inventory_date: data.data.inventory_date,
//           stock: data.data.stock,
//           productId: data.data.productId,
//           userId: data.data.userId,
//         };
//       } else {
//         throw new Error("Inventory not found");
//       }
//     });
//     spyOn(prisma.inventories, "findMany").and.callFake(async () => {
//       return [
//         {
//           id: 1,
//           inventory_date: new Date("2024-11-01"),
//           stock: 100,
//           productId: 1,
//           userId: 1,
//         },
//       ];
//     });
//     spyOn(prisma.inventories, "delete").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return { id: 1 };
//       } else {
//         throw new Error("Inventory not found");
//       }
//     });
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   // Test de création d'un inventaire
//   it("can be created", async () => {
//     const inventory = {
//       inventory_date: new Date("2024-11-01"),
//       stock: 100,
//       productId: 1,
//       userId: 1,
//     };

//     const result = await prisma.inventories.create({
//       data: inventory,
//     });

//     inventoryId = result.id;
//     expect(result).not.toBeNull();
//     expect(result.inventory_date).toEqual(inventory.inventory_date);
//     expect(result.stock).toBe(inventory.stock);
//     expect(result.productId).toBe(inventory.productId);
//     expect(result.userId).toBe(inventory.userId);
//   });

//   // Test de mise à jour d'un inventaire
//   it("can be updated", async () => {
//     const updatedInventory = {
//       inventory_date: new Date("2024-12-01"),
//       stock: 150,
//       productId: 1,
//       userId: 2,
//     };

//     const result = await prisma.inventories.update({
//       where: { id: inventoryId },
//       data: updatedInventory,
//     });

//     expect(result.inventory_date).toEqual(updatedInventory.inventory_date);
//     expect(result.stock).toBe(updatedInventory.stock);
//     expect(result.productId).toBe(updatedInventory.productId);
//     expect(result.userId).toBe(updatedInventory.userId);
//   });

//   it("fails to update an inventory that does not exist", async () => {
//     const invalidId = 999999;
//     const updatedInventory = {
//       inventory_date: new Date("2024-12-31"),
//       stock: 200,
//       productId: 1,
//       userId: 2,
//     };

//     try {
//       await prisma.inventories.update({
//         where: { id: invalidId },
//         data: updatedInventory,
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   // Test de récupération de tous les inventaires
//   it("can get all inventories", async () => {
//     const allInventories = await prisma.inventories.findMany();

//     expect(allInventories).not.toBeNull();
//     expect(allInventories.length).toBeGreaterThan(0);
//   });

//   // Test de suppression d'un inventaire
//   it("can be deleted", async () => {
//     const result = await prisma.inventories.delete({
//       where: { id: inventoryId },
//     });

//     expect(result.id).toEqual(inventoryId);
//   });

//   it("fails to delete an inventory that does not exist", async () => {
//     const invalidId = 999999;

//     try {
//       await prisma.inventories.delete({
//         where: { id: invalidId },
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
