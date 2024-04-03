<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as Dialog from "$lib/components/ui/dialog";
  import { FileEditIcon, TrashIcon } from "lucide-svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import type { Todo } from "../schemas/Todo";

  import { deleteTodo, updateTodo } from "../api";
  import { toast } from "svelte-sonner";

  export let task: Todo;

  const queryClient = useQueryClient();

  const deleteMutation = createMutation({
    mutationKey: ["todos"],
    mutationFn: deleteTodo,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTasks = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (tasks) => {
        return tasks?.filter((t) => t.id !== task.id);
      });
      return { previousTasks };
    },
    onError: async (err, _variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTasks);
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
</script>

<div class="grid gap-2 mt-4">
  <div class="flex items-center gap-4">
    <Checkbox id={task.id} checked={task.completed} class="peer-hidden" />
    <label
      class="flex-1 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for={task.id}
    >
      {task.title}
    </label>
    <div class="flex gap-2 ml-auto">
      <Button class="h-6 w-6" size="icon" variant="outline">
        <FileEditIcon class="h-4 w-4" />
        <span class="sr-only">Modifier</span>
      </Button>
      <Button
        class="h-6 w-6"
        on:click={() => $deleteMutation.mutate(task.id)}
        disabled={$deleteMutation.status === "pending"}
        size="icon"
        variant="outline"
      >
        <TrashIcon class="h-4 w-4" />
        <span class="sr-only">Supprimer</span>
      </Button>
    </div>
  </div>
</div>
