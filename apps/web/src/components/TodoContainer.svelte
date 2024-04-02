<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "$lib/components/ui/card";
  import { FileEditIcon, PlusIcon, TrashIcon } from "lucide-svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { fetchTodos } from "../api";

  const query = createQuery({
    queryKey: ["todos"],
    queryFn: async () => fetchTodos(),
  });

  const EXAMPLE_TASKS = [
    "Acheter des provisions pour la semaine",
    "Appeler maman",
    "Terminer le rapport",
  ];
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
    {#if $query.isPending}
      Loading...
    {/if}
    {#if $query.error}
      An error has occured:
      <pre>{$query.error.message}</pre>
    {/if}
    {#if $query.isSuccess}
      <section>
        {#each EXAMPLE_TASKS as task, idx}
          <div class="grid gap-2 mt-4">
            <div class="flex items-center gap-4">
              <Checkbox class="peer-hidden" id={`task${idx}`} />
              <label
                class="flex-1 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="task1"
              >
                {task}
              </label>
              <div class="flex gap-2 ml-auto">
                <Button class="h-6 w-6" size="icon" variant="outline">
                  <FileEditIcon class="h-4 w-4" />
                  <span class="sr-only">Modifier</span>
                </Button>
                <Button class="h-6 w-6" size="icon" variant="outline">
                  <TrashIcon class="h-4 w-4" />
                  <span class="sr-only">Supprimer</span>
                </Button>
              </div>
            </div>
          </div>
        {/each}
      </section>
    {/if}
  </CardContent>
</Card>
