<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { PlusIcon } from "lucide-svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { fetchTodos } from "../api";

  import Task from "./Task.svelte";

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
    <div class="flex items-center gap-2">
      <Input
        class="flex-1 min-w-0"
        placeholder="Ajouter une tâche"
        type="text"
      />
      <Button class="h-8 w-8" size="icon" variant="outline">
        <PlusIcon class="h-4 w-4" />
        <span class="sr-only">Ajouter</span>
      </Button>
    </div>
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
