import { prisma, type Todo } from "./client";

const DEFAULT_TODOS: Pick<Todo, "title" | "completed">[] = [
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
    await prisma.todo.createMany({
      data: DEFAULT_TODOS,
    });
  } catch (error) {
    console.error("Error creating todos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
