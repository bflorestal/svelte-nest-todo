import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(3, { message: "Le titre doit contenir au moins 3 caractères." })
    .max(50, { message: "Le titre ne doit pas dépasser 50 caractères." }),
  completed: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const TodoListSchema = z.array(TodoSchema);

export type Todo = z.infer<typeof TodoSchema>;

export const FormSchema = TodoSchema.pick({ title: true });
