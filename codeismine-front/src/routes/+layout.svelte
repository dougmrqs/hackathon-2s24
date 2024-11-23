<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	
	let { children } = $props();

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient();
</script>


<QueryClientProvider client={queryClient}>
	<div class="app">
		<Header />

		<main>
			{@render children()}
		</main>
	</div>
</QueryClientProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
