// // make an approprite prisma seed script considering the schema

// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

// async function main() {
//     await client.ticket.create({
//         data: {
//             reason: "I need help with my code",
//             userId: "1234567890",
//             username: "x",
//         },
//     });
// }

// main()
//     .catch((e) => {
//         throw e;
//     })
//     .finally(async () => {
//         await client.$disconnect();
//     });

