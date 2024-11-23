<script lang='ts'>
  import { Tooltip, Card, Label, Input, InputAddon, ButtonGroup, Button } from 'flowbite-svelte';
  import { BuildingOutline, UserCircleOutline, LockOutline, ShieldCheckOutline, CogOutline, WandMagicSparklesOutline } from 'flowbite-svelte-icons';
	import GenerateSecretModal from '../GenerateSecretModal.svelte';
  import * as SecretsConfigRepository from '../SecretConfigsRepository';
	import { generateSecret } from '../SecretGenerator';
	import { createMutation } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
  import * as Cryptography from '../Cryptography';

  let showModal = $state(false);

  let name = $state('');
  let username = $state('');
  let password = $state('');
  let totpKey = $state('');

  function generateNewPassword() {
    const secretsConfig = SecretsConfigRepository.getSecretsConfig();
    if (secretsConfig) {
      password = generateSecret(secretsConfig);
    }
  }

  const mutation = createMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch('http://localhost:8000/api/v1/credentials/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: payload.name,
          username: payload.username,
          password: Cryptography.encrypt(payload.password),
          totp_key: Cryptography.encrypt(payload.totpKey)
        })
      });
      return response.json();
    }
  })

  const toggleModal = () => {
    showModal = !showModal;
  };

  const handleSubmit = async () => {
    await $mutation.mutateAsync({
      name,
      username,
      password,
      totpKey,
    });
    
    goto('/vault');
  }
</script>

<Card>
  <div class="p-6">
    <h2 class="text-lg font-semibold">Details</h2>
    <p class="text-sm text-gray-600">View and manage your credential</p>
    <div class="mt-2">
      <!-- svelte-ignore event_directive_deprecated -->
      <form action="" on:submit={handleSubmit}>
          <Label for="website-admin" class="block mb-2">Credential Name
            <ButtonGroup class="w-full">
              <InputAddon>
                <BuildingOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="website-admin" placeholder="github.com" value={name} on:change={(e) => name = e.target?.value}/>
            </ButtonGroup>
          </Label>

          <Label for="username" class="block mb-2">Username
            <ButtonGroup class="w-full">
              <InputAddon>
                <UserCircleOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="username" placeholder="username" value={username} on:change={(e) => username = e.target?.value}/>
            </ButtonGroup>
          </Label>

          <Label for="password" class="block mb-2">Password
            <ButtonGroup class="w-full">
              <InputAddon>
                <LockOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="password" type='password' value={password} on:change={(e) => password = e.target?.value}/>
              <Button color='dark' id='generate-password' on:click={generateNewPassword}>
                <WandMagicSparklesOutline />
              </Button>
              <Button color='light' id='configure-generator' on:click={toggleModal}>
                <CogOutline />
              </Button>
            </ButtonGroup>
            <Tooltip triggeredBy='#generate-password'>
              Generate a strong password
            </Tooltip>
            <Tooltip triggeredBy='#configure-generator'>
              Configure password generator
            </Tooltip>
          </Label>

          <Label for="totp-key" class="block mb-2">TOTP Key
            <ButtonGroup class="w-full">
              <InputAddon>
                <ShieldCheckOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="totp-key" value={totpKey} on:change={(e) => totpKey = e.target?.value}/>
            </ButtonGroup>
          </Label>

          <!-- <Label for="master-password" class="block mt-8 mb-2">CodeIsMine password
            <ButtonGroup class="w-full">
              <InputAddon>
                <LockOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="master-password" type="password" value={accountPassword} on:change={(e) => accountPassword = e.target?.value}/>
            </ButtonGroup>
          </Label> -->

          <div class="flex justify-between">
            <Button class='mt-2' type='submit' color='blue'>Save</Button>
            <Button class='mt-2' href='/vault' color='red'>Cancel</Button>
          </div>
      </form>
    </div>
  </div>
</Card>

<GenerateSecretModal bind:showModal={showModal} />
