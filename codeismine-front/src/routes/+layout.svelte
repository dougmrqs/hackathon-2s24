<script lang="ts">
	import '../app.css';
	
	let { children } = $props();

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<div class="app">
		<header>
			<a href="/">
				<h1 class="font-black">CodeIsMine</h1>
			</a>
		</header>

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

	header {
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}

	header a {
		text-decoration: none;
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
