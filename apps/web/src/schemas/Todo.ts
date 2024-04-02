import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(255),
  completed: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const TodoListSchema = z.array(TodoSchema);

export type Todo = z.infer<typeof TodoSchema>;
