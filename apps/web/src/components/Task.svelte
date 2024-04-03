<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { TrashIcon } from "lucide-svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { type Todo, FormSchema } from "../schemas/Todo";

  import { deleteTodo, updateTodo } from "../api";
  import { toast } from "svelte-sonner";
  import TodoUpdateDialog from "./TodoUpdateDialog.svelte";

  export let task: Todo;

  const queryClient = useQueryClient();

  const updateMutation = createMutation({
    mutationKey: ["todos"],
    mutationFn: updateTodo,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTasks = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (tasks) => {
        return tasks?.map((t) => {
          if (t.id === updatedTask.id) {
            return updatedTask;
          }
          return t;
        });
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

  function updateTitle(title: string) {
    try {
      const parsedTitle = FormSchema.parse({ title });

      $updateMutation.mutate({
        ...task,
        title: parsedTitle.title,
      });
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de la tâche."
      );
    }
  }

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
    <Checkbox
      class="peer-hidden"
      on:click={() => {
        $updateMutation.mutate({
          ...task,
          completed: !task.completed,
        });
      }}
      id={task.id}
      checked={task.completed}
      disabled={$updateMutation.status === "pending"}
    />
    <label
      class="flex-1 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for={task.id}
    >
      {task.title}
    </label>
    <div class="flex gap-2 ml-auto">
      <TodoUpdateDialog {task} {updateTitle} />
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
