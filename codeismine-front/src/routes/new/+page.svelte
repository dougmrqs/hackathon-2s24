<script>
  import { Tooltip, Card, Label, Input, InputAddon, ButtonGroup, Button } from 'flowbite-svelte';
  import { BuildingOutline, UserCircleOutline, LockOutline, ShieldCheckOutline, CogOutline, WandMagicSparklesOutline } from 'flowbite-svelte-icons';
	import GenerateSecretModal from '../vault/GenerateSecretModal.svelte';
	import { onMount } from 'svelte';

  import * as SecretsConfigRepository from '../vault/SecretConfigsRepository';
	import { generateSecret } from '../vault/SecretGenerator';

  let showModal = $state(false);

  let password = $state('');
  let newPassword = $state('');

  onMount(() => {
    password = 'existingPassword';
  });

  function generateNewPassword() {
    const secretsConfig = SecretsConfigRepository.getSecretsConfig();
    if (secretsConfig) {
      newPassword = generateSecret(secretsConfig);
    }
  }

  const toggleModal = () => {
    showModal = !showModal;
  };
</script>

<Card>
  <div class="p-6">
    <h2 class="text-lg font-semibold">Details</h2>
    <p class="text-sm text-gray-600">View and manage your credential</p>
    <div class="mt-2">
      <form action="">
          <Label for="website-admin" class="block mb-2">Credential Name
            <ButtonGroup class="w-full">
              <InputAddon>
                <BuildingOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="website-admin" placeholder="github.com" />
            </ButtonGroup>
          </Label>

          <Label for="username" class="block mb-2">Username
            <ButtonGroup class="w-full">
              <InputAddon>
                <UserCircleOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="username" placeholder="username" />
            </ButtonGroup>
          </Label>

          <Label for="password" class="block mb-2">Password
            <ButtonGroup class="w-full">
              <InputAddon>
                <LockOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </InputAddon>
              <Input id="password" type='password' value={newPassword || password}/>
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
              <Input id="totp-key"/>
            </ButtonGroup>
          </Label>

          <Button class='mt-2' type='submit' color='blue'>Save</Button>
      </form>
    </div>
  </div>
</Card>

<GenerateSecretModal bind:showModal={showModal} />