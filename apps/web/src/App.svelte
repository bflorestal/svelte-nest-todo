<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import TodoContainer from "./components/todo-container.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
</script>

<ModeWatcher />
<Toaster richColors />
<QueryClientProvider client={queryClient}>
  <main class="grid">
    <TodoContainer />
  </main>
</QueryClientProvider>
