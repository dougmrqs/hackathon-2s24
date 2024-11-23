<script lang="ts">
	import '../app.css';
	
	let { children } = $props();

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation';
	import { sessionTimeoutTimer } from '$lib/session';
	import Fa from 'svelte-fa';
	import { faVault } from '@fortawesome/free-solid-svg-icons';

  const queryClient = new QueryClient();

	const sessionTimer = setTimeout(() => {
		sessionTimeoutTimer.set(null);
		localStorage.removeItem('token');
		goto('/lock');
	}, 1000 * 60 * 30);

	sessionTimeoutTimer.set(sessionTimer);
</script>

<QueryClientProvider client={queryClient}>
	<div class="app">
		<header>
			<a href="/">
				<div class='flex justify-center items-center h-full'>
					<h1 class="font-black">CodeIsMine</h1>
					<Fa class='ml-3' size='lg' icon={faVault} />
				</div>
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
