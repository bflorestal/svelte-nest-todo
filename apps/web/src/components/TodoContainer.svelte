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

  export let tasks: string[] = [];
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
    {#each tasks as task, idx}
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
  </CardContent>
</Card>
