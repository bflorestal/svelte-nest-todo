<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { FileEditIcon, TrashIcon } from "lucide-svelte";
  import type { Todo } from "../schemas/Todo";

  export let task: Todo;
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
      <Button class="h-6 w-6" size="icon" variant="outline">
        <TrashIcon class="h-4 w-4" />
        <span class="sr-only">Supprimer</span>
      </Button>
    </div>
  </div>
</div>
