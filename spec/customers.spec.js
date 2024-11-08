// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests du Modèle Customers", () => {
//   let customerId = null;

//   beforeAll(() => {
//     spyOn(prisma.customers, "create").and.callFake(async (data) => {
//       return {
//         id: 1,
//         address: data.data.address,
//         firstName: data.data.firstName,
//         lastName: data.data.lastName,
//         phone: data.data.phone,
//       };
//     });
//     spyOn(prisma.customers, "update").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return {
//           id: 1,
//           address: data.data.address,
//           firstName: data.data.firstName,
//           lastName: data.data.lastName,
//           phone: data.data.phone,
//         };
//       } else {
//         throw new Error("Customer not found");
//       }
//     });
//     spyOn(prisma.customers, "findMany").and.callFake(async () => {
//       return [
//         {
//           id: 1,
//           address: "123 Main St",
//           firstName: "John",
//           lastName: "Doe",
//           phone: "123-456-7890",
//         },
//       ];
//     });
//     spyOn(prisma.customers, "delete").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return { id: 1 };
//       } else {
//         throw new Error("Customer not found");
//       }
//     });
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   // Test de création d'un client
//   it("can be created", async () => {
//     const customer = {
//       address: "123 Main St",
//       firstName: "John",
//       lastName: "Doe",
//       phone: "123-456-7890",
//     };

//     const result = await prisma.customers.create({
//       data: customer,
//     });

//     customerId = result.id;
//     expect(result).not.toBeNull();
//     expect(result.address).toBe(customer.address);
//     expect(result.firstName).toBe(customer.firstName);
//     expect(result.lastName).toBe(customer.lastName);
//     expect(result.phone).toBe(customer.phone);
//   });

//   // Test de mise à jour d'un client
//   it("can be updated", async () => {
//     const updatedCustomer = {
//       address: "456 Elm St",
//       firstName: "Jane",
//       lastName: "Doe",
//       phone: "987-654-3210",
//     };

//     const result = await prisma.customers.update({
//       where: { id: customerId },
//       data: updatedCustomer,
//     });

//     expect(result.address).toBe(updatedCustomer.address);
//     expect(result.firstName).toBe(updatedCustomer.firstName);
//     expect(result.lastName).toBe(updatedCustomer.lastName);
//     expect(result.phone).toBe(updatedCustomer.phone);
//   });

//   it("fails to update a customer that does not exist", async () => {
//     const invalidId = 999999;
//     const updatedCustomer = {
//       address: "789 Maple St",
//       firstName: "Alex",
//       lastName: "Smith",
//       phone: "555-555-5555",
//     };

//     try {
//       await prisma.customers.update({
//         where: { id: invalidId },
//         data: updatedCustomer,
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   // Test de récupération de tous les clients
//   it("can get all customers", async () => {
//     const allCustomers = await prisma.customers.findMany();

//     expect(allCustomers).not.toBeNull();
//     expect(allCustomers.length).toBeGreaterThan(0);
//   });

//   // Test de suppression d'un client
//   it("can be deleted", async () => {
//     const result = await prisma.customers.delete({
//       where: { id: customerId },
//     });

//     expect(result.id).toEqual(customerId);
//   });

//   it("fails to delete a customer that does not exist", async () => {
//     const invalidId = 999999;

//     try {
//       await prisma.customers.delete({
//         where: { id: invalidId },
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
