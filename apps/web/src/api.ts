import { TodoListSchema } from "./schemas/Todo";

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
