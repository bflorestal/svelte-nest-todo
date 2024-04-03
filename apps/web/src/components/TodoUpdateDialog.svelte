<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  //   import { Dialog as BitsDialog } from "bits-ui";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { cn } from "$lib/utils";
  import { FileEditIcon } from "lucide-svelte";

  import type { Todo } from "../schemas/Todo";

  export let task: Todo;
  export let updateTitle: (title: string) => void;
</script>

<Dialog.Root>
  <Dialog.Trigger
    class={cn(buttonVariants({ size: "icon", variant: "outline" }), "h-6 w-6")}
  >
    <FileEditIcon class="h-4 w-4" />
    <span class="sr-only">Modifier</span></Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Modifier la tâche</Dialog.Title>
      <Dialog.Description>
        Une fois la tâche modifiée, cliquez sur "Enregistrer".
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="title" class="text-right">Tâche</Label>
        <Input
          id="title"
          bind:value={task.title}
          placeholder="Faire les courses"
          class="col-span-3"
        />
      </div>
    </div>
    <Dialog.Footer>
      <Dialog.Close disabled={task.title.trim().length < 3}>
        <Button
          on:click={() => updateTitle(task.title)}
          type="submit"
          disabled={task.title.trim().length < 3}
          >Enregistrer
        </Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
