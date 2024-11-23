<script lang="ts">
	import validateEmail from 'email-validator';
	import { Label, Input, Card, Button, Helper } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isEmailFieldDirty = $state(false);
	let isEmailEmpty = $derived(email === '');
	let isEmailValid = $derived(isEmailEmpty || validateEmail.validate(email));
	let passwordMeetsMinimumChars = $derived(password.length >= 8);

	let canSubmitForm = $derived(email !== '' && isEmailValid && passwordMeetsMinimumChars);

	const submit = (e: SubmitEvent) => {
		console.log(e, email, password);
		goto("/vault")
	};
</script>

<Card>
	<!-- svelte-ignore event_directive_deprecated -->
	<form class="flex flex-col justify-center" on:submit|preventDefault={submit}>
		<div class="mb-6">
			<Label for="email-input" class="mb-2 block">Email address</Label>
			<Input
				id="email-input"
				size="lg"
				placeholder="Your email address"
				bind:value={email}
				on:blur={() => (isEmailFieldDirty = true)}
			/>
			{#if isEmailFieldDirty && !isEmailValid}
				<Helper class="mt-2" color="red">Invalid email</Helper>
			{/if}
		</div>

		<div class="mb-6">
			<Label for="password-input" class="mb-2 block">Password</Label>
			<Input id="password-input" size="lg" type="password" bind:value={password} />
		</div>

		<Button type="submit" color="blue" disabled={!canSubmitForm}>Unlock</Button>
	</form>
</Card>
