import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import prisma from "../prisma";

function randomDateOfBirth() {
  const start = new Date(1975, 0, 1).getTime();
  const end = new Date(2007, 11, 31).getTime();
  const dob = new Date(start + Math.random() * (end - start));
  return dob.toISOString(); // YYYY-MM-DD
}

async function main() {
  const users = Array.from({ length: 30 }).map(() => ({
    clerkUserId: randomUUID(),
    Profile: {
      create: {
        bio: faker.lorem.sentence(),
        date_of_birth: randomDateOfBirth(),
      },
    },
  }));

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
