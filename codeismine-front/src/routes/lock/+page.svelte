<script lang="ts">
	import validateEmail from 'email-validator';
	import { Label, Input, Card, Button, Helper, Spinner } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isEmailFieldDirty = $state(false);
	let isEmailEmpty = $derived(email === '');
	let isEmailValid = $derived(isEmailEmpty || validateEmail.validate(email));
	let passwordMeetsMinimumChars = $derived(password.length >= 8);
	let hadLoginError = $state(false);
	let isSubmitting = $state(false);

	let canSubmitForm = $derived(email !== '' && isEmailValid && passwordMeetsMinimumChars);

	const submit = async (e: SubmitEvent) => {
		isSubmitting = true;
		hadLoginError = false;

		const response = await fetch('http://localhost:8000/api/v1/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
        })
      });

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			localStorage.setItem('token', data.token);
			goto("/vault")
		} else {
			isSubmitting = false;
			hadLoginError = true;
		}
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

		<!-- <div class='flex justify-center'>
			<span class='text-red-400'>OR</span>
		</div>

		<div class="mb-6">
			<Label for="username-input" class="mb-2">Username</Label>
			<Input id="username-input" size="lg" placeholder="Your username" />
		</div> -->

		<div class="mb-6">
			<Label for="password-input" class="mb-2 block">Password</Label>
			<Input id="password-input" size="lg" type="password" bind:value={password} />
		</div>

		<Button type="submit" color="blue" disabled={!canSubmitForm || isSubmitting}>
			{#if isSubmitting}
				<Spinner size="5" color="white" />
			{:else}
				Unlock
			{/if}
		</Button>

		{#if hadLoginError}
			<Helper class="py-2 text-center" color="red">Failed to log in. Check your email/password.</Helper>
		{/if}
	</form>
</Card>
