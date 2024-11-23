<script lang="ts">
  import validateEmail from 'email-validator';
  import { Label, Input, Card, Button, Helper } from 'flowbite-svelte';

  let email = $state("");
  let password = $state("");
  let isEmailFieldDirty = $state(false);
  let isEmailValid = $derived(email === "" || validateEmail.validate(email));
  let passwordMeetsMinimumChars = $derived(password.length >= 8);

  let canSubmitForm = $derived(email !== "" && isEmailValid && passwordMeetsMinimumChars);

  const submit = (e: SubmitEvent) => {
    console.log(e, email, password);
  }
</script>

<Card>
  <!-- svelte-ignore event_directive_deprecated -->
  <form on:submit|preventDefault={submit}>
    <div class="mb-6">
      <Label for="email-input" class="block mb-2">Email address</Label>
      <Input id="email-input" size="lg" placeholder="email@provider.com" bind:value={email} on:blur={() => isEmailFieldDirty = true} />
      {#if isEmailFieldDirty && !isEmailValid}
        <Helper class="mt-2" color="red">
          Invalid email
        </Helper>
      {/if}
    </div>

    <div class="mb-6">
      <Label for="password-input" class="block mb-2">Password</Label>
      <Input id="password-input" size="lg" type="password" bind:value={password} />
    </div>

    <Button type="submit" color="blue" disabled={!canSubmitForm}>Unlock</Button>
  </form>
</Card>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>