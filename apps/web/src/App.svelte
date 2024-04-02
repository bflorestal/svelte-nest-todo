<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import TodoContainer from "./components/TodoContainer.svelte";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <main class="grid">
    <TodoContainer />
  </main>
</QueryClientProvider>
