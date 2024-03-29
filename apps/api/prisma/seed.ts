import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_TODOS: Prisma.TodoCreateInput[] = [
  {
    title: "Finish homework",
    completed: false,
  },
  {
    title: "Go grocery shopping",
    completed: false,
  },
  {
    title: "Exercise",
    completed: false,
  },
];

async function main() {
  try {
    await prisma.todo.createMany({ data: DEFAULT_TODOS });
    console.log(DEFAULT_TODOS);
  } catch (error) {
    console.error("Error creating todos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
