// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// describe("Tests du Modèle Products", () => {
//   let productId = null;

//   // Avant chaque test, créer un produit
//   beforeAll(async () => {
//     const product = await prisma.products.create({
//       data: {
//         name: "Produit Test",
//         description: "Description du produit test",
//         stock: 100,
//         sale_price: 20,
//         purchase_price: 15,
//         threshold: 10,
//         prescription_req: false,
//         barcode: "1234567890123"
//       }
//     });
//     productId = product.id;
//   });

//   it("Créer un produit", async () => {
//     const product = await prisma.products.findUnique({ where: { id: productId } });
//     expect(product).not.toBeNull();
//     expect(product.name).toBe("Produit Test");
//     expect(product.stock).toBe(100);
//     expect(product.barcode).toBe("1234567890123");
//   });

//   it("Mettre à jour le stock d'un produit", async () => {
//     const updatedProduct = await prisma.products.update({
//       where: { id: productId },
//       data: { stock: 200 }
//     });
//     expect(updatedProduct.stock).toBe(200);
//   });

//   it("Récupérer un produit par ID", async () => {
//     const product = await prisma.products.findUnique({ where: { id: productId } });
//     expect(product).not.toBeNull();
//     expect(product.id).toBe(productId);
//   });

//    // Après tous les tests, supprimer le produit créé pour les tests
//    afterAll(async () => {
//     await prisma.products.delete({ where: { id: productId } });
//     await prisma.$disconnect();
//   });
// });
