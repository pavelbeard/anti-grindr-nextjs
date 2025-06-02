import prisma from "./prisma";

export async function main() {
  // Create Genders and Pronouns (required for Profile relations)
  const [maleGender, femaleGender] = await Promise.all([
    prisma.gender.create({
      data: { name: "male" },
    }),
    prisma.gender.create({
      data: { name: "female" },
    }),
  ]);

  const [hePronoun, shePronoun] = await Promise.all([
    prisma.pronoun.create({
      data: { name: "he_him_his" },
    }),
    prisma.pronoun.create({
      data: { name: "she_her_hers" },
    }),
  ]);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      clerkUserId: "clerk1",
      online: true,
      Profile: {
        create: {
          name: "Alice",
          height: 170,
          weight: 65,
          bio: "Hello, I am Alice.",
          genders: { connect: { id: femaleGender.id } },
          pronouns: { connect: { id: shePronoun.id } },
        },
      },
    },
    include: { Profile: true },
  });

  const user2 = await prisma.user.create({
    data: {
      clerkUserId: "clerk2",
      online: true,
      Profile: {
        create: {
          name: "Bob",
          height: 180,
          weight: 80,
          bio: "Hey, I am Bob.",
          genders: { connect: { id: maleGender.id } },
          pronouns: { connect: { id: hePronoun.id } },
        },
      },
    },
    include: { Profile: true },
  });

  const user3 = await prisma.user.create({
    data: {
      clerkUserId: "clerk3",
      online: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      Profile: {
        create: {
          name: "Charlie",
          height: 175,
          weight: 70,
          bio: "Hi, I am Charlie.",
          genders: { connect: { id: femaleGender.id } },
          pronouns: { connect: { id: shePronoun.id } },
        },
      },
    },
    include: { Profile: true },
  });

  const user4 = await prisma.user.create({
    data: {
      clerkUserId: "clerk4",
      online: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      Profile: {
        create: {
          name: "David",
          height: 180,
          weight: 75,
          bio: "Hello, I am David.",
          genders: { connect: { id: femaleGender.id } },
          pronouns: { connect: { id: shePronoun.id } },
        },
      },
    },
    include: { Profile: true },
  });

  // Create Chat
  const chat = await prisma.chat.create({
    data: {
      members: {
        create: [{ userId: user1.clerkUserId }, { userId: user2.clerkUserId }],
      },
    },
  });

  const chat2 = await prisma.chat.create({
    data: {
      members: {
        create: [{ userId: user3.clerkUserId }, { userId: user4.clerkUserId }],
      },
    },
  });

  const chat3 = await prisma.chat.create({
    data: {
      members: {
        create: [{ userId: user1.clerkUserId }, { userId: user4.clerkUserId }],
      },
    },
  });

  // Create 100 Messages (alternating users)
  const messagesData = Array.from({ length: 100 }).map((_, i) => ({
    id: `message-${i + 1}`,
    text: `Message ${i + 1}`,
    chatId: chat.id,
    userId: i % 2 === 0 ? user1.clerkUserId : user2.clerkUserId,
    profileId: i % 2 === 0 ? user1.Profile!.id : user2.Profile!.id,
    createdAt: new Date(Date.now() - (100 - i) * 1000), // spread out timestamps
  }));

  // Create Messages between each user in the app
  const messagesDataForUser1And4 = [
    ...Array.from({ length: 100 }).map((_, i) => ({
      id: `message-${i + 101}`,
      text: `Message ${i + 1} from Alice to David`,
      chatId: chat3.id,
      userId: i % 2 === 0 ? user1.clerkUserId : user4.clerkUserId,
      profileId: i % 2 === 0 ? user1.Profile!.id : user4.Profile!.id,
      createdAt: new Date(Date.now() - (100 - i) * 1000), // spread out timestamps
    })),
  ];

  await prisma.message.createMany({ data: messagesData });
  await prisma.message.createMany({ data: messagesDataForUser1And4 });

  console.log("Database setup completed successfully.");
}
