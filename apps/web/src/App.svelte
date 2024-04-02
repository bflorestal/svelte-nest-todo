<script lang="ts">
  import TodoContainer from "./components/TodoContainer.svelte";

  const EXAMPLE_TASKS = [
    "Acheter des provisions pour la semaine",
    "Appeler maman",
    "Terminer le rapport",
  ];
</script>

<main class="grid">
  <TodoContainer tasks={EXAMPLE_TASKS} />
</main>
