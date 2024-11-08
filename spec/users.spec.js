// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// describe("Tests du Modèle Users", () => {
//   let userId = null;

//   beforeAll(() => {
//     spyOn(prisma.users, "create").and.callFake(async (data) => {
//       return {
//         id: 1,
//         nom: data.data.name,
//         email: data.data.email,
//         password: data.data.password,
//         role: data.data.role,
//         status: data.data.status,
//       };
//     });
//     spyOn(prisma.users, "update").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return {
//           id: 1,
//           nom: data.data.nom,
//           email: data.data.email,
//           password: data.data.password,
//           role: data.data.role,
//           status: data.data.status,
//         };
//       } else {
//         throw new Error("user not found");
//       }
//     });
//     spyOn(prisma.users, "findMany").and.callFake(async () => {
//       return [
//         {
//           id: 1,
//           nom: "ahmadou",
//           email: "ahmadou@gmail.com",
//           password: "1234",
//           role: "ADMIN",
//           status: "ACTIVE",
//         },
//       ];
//     });
//     spyOn(prisma.users, "delete").and.callFake(async (data) => {
//       if (data.where.id === 1) {
//         return { id: 1 };
//       } else {
//         throw new Error("use not found");
//       }
//     });
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });

//   // Test de création d'un utilisateur
//   it("can be created", async () => {
//     const user = {
//       name: "ahmadou",
//       email: "ahmadou@example.com",
//       password: "123456",
//       role: "ADMIN",
//       status: "ACTIVE",
//     };

//     const result = await prisma.users.create({
//       data: user,
//     });

//     userId = result.id;
//     expect(result).not.toBeNull();
//     expect(result.name).toBe(user.name);
//     expect(result.email).toBe(user.email);
//     expect(result.password).toBe(user.password);
//     expect(result.role).toBe(user.role);
//     expect(result.status).toBe(user.status);
//   });

//   it("can be updated", async () => {
//     const updatedUser = {
//       name: "ahmadou",
//       email: "ahmadou@example.com",
//       password: "123456",
//       role: "CAISSIER",
//       status: "ACTIVE",
//     };

//     const result = await prisma.users.update({
//       where: { id: userId },
//       data: updatedUser,
//     });

//     expect(result.name).toBe(updatedUser.name);
//     expect(result.email).toBe(updatedUser.email);
//     expect(result.password).toBe(updatedUser.password);
//     expect(result.role).toBe(updatedUser.role);
//     expect(result.status).toBe(updatedUser.status);
//   });

//   it("fails to update a utilisateur that does not exist", async () => {
//     const invalidId = 999999;
//     const updatedUser = {
//       nom: "Thimbo",
//       email: "thimbo@gmail.com",
//       role: "garage",
//       password: "1234",
//     };

//     try {
//       await prisma.users.update({
//         where: { id: invalidId },
//         data: updatedUser,
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   it("can get all utilisateurs", async () => {
//     const allUser = await prisma.users.findMany();

//     expect(allUser).not.toBeNull();
//     expect(allUser.length).toBeGreaterThan(0);
//   });

//   it("can be deleted", async () => {
//     const result = await prisma.users.delete({
//       where: { id: userId },
//     });

//     expect(result.id).toEqual(userId);
//   });

//   it("fails to delete a utilisateur that does not exist", async () => {
//     const invalidId = 999999;

//     try {
//       await prisma.users.delete({
//         where: { id: invalidId },
//       });
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
