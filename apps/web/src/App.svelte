<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import TodoContainer from "./components/TodoContainer.svelte";

  const queryClient = new QueryClient();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
  <main class="grid">
    <TodoContainer />
  </main>
</QueryClientProvider>
