// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests du Modèle Suppliers", () => {
//   let supplierId = null;

//   beforeAll(() => {
//     spyOn(prisma.suppliers, "create").and.callFake(async (data) => {
//       return {
//         id: 1,
//         name: data.data.name,
//         address: data.data.address,
//         contact: data.data.contact,
//         userId: data.data.userId,
//       };
//     });
//     spyOn(prisma.suppliers, "update").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return {
//           id: 1,
//           name: data.data.name,
//           address: data.data.address,
//           contact: data.data.contact,
//           userId: data.data.userId,
//         };
//       } else {
//         throw new Error("Supplier not found");
//       }
//     });
//     spyOn(prisma.suppliers, "findMany").and.callFake(async () => {
//       return [
//         {
//           id: 1,
//           name: "Pharma Supplier",
//           address: "123 Pharma Street",
//           contact: "123-456-7890",
//           userId: 1,
//         },
//       ];
//     });
//     spyOn(prisma.suppliers, "delete").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return { id: 1 };
//       } else {
//         throw new Error("Supplier not found");
//       }
//     });
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   // Test de création d'un supplier
//   it("can be created", async () => {
//     const supplier = {
//       name: "Pharma Supplier",
//       address: "123 Pharma Street",
//       contact: "123-456-7890",
//       userId: 1,
//     };

//     const result = await prisma.suppliers.create({
//       data: supplier,
//     });

//     supplierId = result.id;
//     expect(result).not.toBeNull();
//     expect(result.name).toBe(supplier.name);
//     expect(result.address).toBe(supplier.address);
//     expect(result.contact).toBe(supplier.contact);
//     expect(result.userId).toBe(supplier.userId);
//   });

//   // Test de mise à jour d'un supplier
//   it("can be updated", async () => {
//     const updatedSupplier = {
//       name: "Pharma Supplier Updated",
//       address: "456 New Pharma Street",
//       contact: "987-654-3210",
//       userId: 1,
//     };

//     const result = await prisma.suppliers.update({
//       where: { id: supplierId },
//       data: updatedSupplier,
//     });

//     expect(result.name).toBe(updatedSupplier.name);
//     expect(result.address).toBe(updatedSupplier.address);
//     expect(result.contact).toBe(updatedSupplier.contact);
//     expect(result.userId).toBe(updatedSupplier.userId);
//   });

//   it("fails to update a supplier that does not exist", async () => {
//     const invalidId = 999999;
//     const updatedSupplier = {
//       name: "Nonexistent Supplier",
//       address: "Nonexistent Address",
//       contact: "000-000-0000",
//     };

//     try {
//       await prisma.suppliers.update({
//         where: { id: invalidId },
//         data: updatedSupplier,
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   // Test de récupération de tous les suppliers
//   it("can get all suppliers", async () => {
//     const allSuppliers = await prisma.suppliers.findMany();

//     expect(allSuppliers).not.toBeNull();
//     expect(allSuppliers.length).toBeGreaterThan(0);
//   });

//   // Test de suppression d'un supplier
//   it("can be deleted", async () => {
//     const result = await prisma.suppliers.delete({
//       where: { id: supplierId },
//     });

//     expect(result.id).toEqual(supplierId);
//   });

//   it("fails to delete a supplier that does not exist", async () => {
//     const invalidId = 999999;

//     try {
//       await prisma.suppliers.delete({
//         where: { id: invalidId },
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
