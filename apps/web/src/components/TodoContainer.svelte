<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { createQuery } from "@tanstack/svelte-query";
  import { fetchTodos } from "../api";

  import Task from "./Task.svelte";
  import TodoForm from "./TodoForm.svelte";

  const query = createQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const todos = await fetchTodos();
      return todos || [];
    },
  });

  const loadingTasks = Array.from({ length: 5 }, () => ({}));
</script>

<Card class="w-full max-w-lg mx-auto">
  <CardHeader>
    <CardTitle tag="h1" class="text-lg">To-do list</CardTitle>
    <CardDescription>Gérez vos tâches</CardDescription>
  </CardHeader>
  <CardContent>
    <!-- Form -->
    <TodoForm />
    <!-- List -->
    <div class="mt-4">
      {#if $query.isPending}
        {#each loadingTasks as _}
          <Skeleton class="h-6 mt-4 w-full" />
        {/each}
      {/if}
      {#if $query.error}
        <p>Une erreur est survenue lors du chargement des tâches.</p>
      {/if}
      {#if $query.isSuccess}
        {#each $query.data as task (task.id)}
          <Task {task} />
        {/each}
      {/if}
    </div>
  </CardContent>
</Card>
