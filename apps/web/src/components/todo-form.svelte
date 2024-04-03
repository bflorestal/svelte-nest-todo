<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { PlusIcon } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { createTodo } from "../api";
  import { ZodError } from "zod";
  import { FormSchema } from "../schemas/Todo";

  let title = "";

  const queryClient = useQueryClient();

  const addMutation = createMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  async function handleSubmit() {
    try {
      const parsedTodo = FormSchema.parse({ title });

      const newTodo = $addMutation.mutate(parsedTodo.title);

      title = "";
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Une erreur s'est produite lors de l'ajout de la tâche.");
      }
    }
  }
</script>

<form
  class="flex items-center gap-2"
  method="POST"
  on:submit|preventDefault={handleSubmit}
>
  <Input
    class="flex-1 min-w-0"
    type="text"
    name="title"
    bind:value={title}
    placeholder="Ajouter une tâche"
    disabled={$addMutation.status === "pending"}
    required
  />
  <Button
    class="h-8 w-8"
    disabled={$addMutation.status === "pending" || title.trim().length < 3}
    size="icon"
    variant="outline"
    type="submit"
  >
    <PlusIcon class="h-4 w-4" />
    <span class="sr-only">Ajouter</span>
  </Button>
</form>
