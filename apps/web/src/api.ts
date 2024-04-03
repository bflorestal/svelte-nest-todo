import { TodoListSchema, TodoSchema, type Todo } from "./schemas/Todo";

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

export function handleError(err: unknown) {
  if (err instanceof ResponseError) {
    switch (err.response.status) {
      case 400:
        // handle 400 errors
        console.error("Bad request");
        break;
      case 404:
        // handle 404 errors
        console.error("Not found");
        break;
      case 500:
        // handle 500 errors
        console.error("Internal server error");
        break;
      default:
        // Show
        throw new Error("Unhandled fetch response", { cause: err });
    }
  }
  throw new Error("Unknown fetch error", { cause: err });
}

export async function fetchTodos() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`);
    if (!res.ok) {
      throw new ResponseError("Failed to fetch todos", res);
    }

    const data = await res.json();

    const todos = TodoListSchema.parse(data);

    return todos;
  } catch (error) {
    handleError(error);
  }
}

export async function createTodo(title: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new ResponseError("Failed to create todo", res);
    }

    const data = await res.json();

    const parsedTodo = TodoSchema.parse(data);

    return parsedTodo;
  } catch (error) {
    handleError(error);
  }
}

export async function updateTodo(todo: Todo) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new ResponseError("Failed to update todo", res);
    }

    const data = await res.json();

    const parsedTodo = TodoSchema.parse(data);

    return parsedTodo;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTodo(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new ResponseError("Failed to delete todo", res);
    }

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    handleError(error);
  }
}
