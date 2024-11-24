<script lang='ts'>
  import { Card, Range, Modal, Label, Toggle, Button, ButtonGroup } from 'flowbite-svelte';
  import { FileCopyAltOutline, RefreshOutline } from 'flowbite-svelte-icons';
  import copyToClipboard from 'copy-to-clipboard';
  import SuccessToast from './SuccessToast.svelte';
	import { onMount } from 'svelte';

  import * as SecretsConfigRepository from './SecretConfigsRepository'

  import { generateSecret } from './SecretGenerator'
  
  let { showModal = $bindable() } = $props();
  
  let generatedPassword = $state('');
  let length = $state(20);
  let includeNumbers = $state(true);
  let includeSymbols = $state(true);
  let includeLowercase = $state(true);
  let includeUppercase = $state(true);

  let isFormValid = $derived(
    length >= 5 && (includeNumbers || includeSymbols || includeLowercase || includeUppercase)
  )
  
  function doGenerateSecret() {
    return generateSecret({
      length,
      includeNumbers,
      includeSymbols,
      includeLowercase,
      includeUppercase
    });
  }

  onMount(() => {
    const settings = SecretsConfigRepository.getSecretsConfig();

    if (settings) {
      length = settings.length;
      includeNumbers = settings.includeNumbers;
      includeSymbols = settings.includeSymbols;
      includeLowercase = settings.includeLowercase;
      includeUppercase = settings.includeUppercase;
    }

    generatedPassword = doGenerateSecret();
  })

  $effect(() => {
    localStorage.setItem('passwordGeneratorSettings', JSON.stringify({
      length,
      includeNumbers,
      includeSymbols,
      includeLowercase,
      includeUppercase
    }));
  });

  const doCopyToClipboard = async (credential: string) => {
    try {
      copyToClipboard(credential);
      triggerSuccessToast();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  let toastStatus = $state(false);
  let toastTimer: number;

  const triggerSuccessToast = () => {
    if (toastTimer) clearTimeout(toastTimer);

    toastStatus = true;

    toastTimer = setTimeout(() => { toastStatus = false }, 4000);
  }

</script>

<Modal title="Generate Secret" bind:open={showModal} class='max-w-30vw' outsideclose>
  <Card class='w-full'>
    <div class='flex items-center justify-between'>
      <span class='overflow-hidden'>{generatedPassword}</span>
      <ButtonGroup>
        <Button color='light' disabled={!isFormValid} on:click={() => doCopyToClipboard(generatedPassword)}>
          <FileCopyAltOutline />
        </Button>
        <Button color='light' size='xs' disabled={!isFormValid} on:click={() => generatedPassword = doGenerateSecret()}>
          <RefreshOutline />
        </Button>
      </ButtonGroup>
    </div>
  </Card>

  <form action="">
    <Label for='length' class='block mb-2'>
      Length {length}
      <Range id="length" type='range' bind:value={length} min='5' max='150' />
    </Label>

    <div class='grid grid-cols-1 md:grid-cols-2 gap-2'>
      <Label for='includeNumbers' class='block mb-2'>
        Include Numbers
        <Toggle type='checkbox' id='includeNumbers' bind:checked={includeNumbers} />
      </Label>

      <Label for='includeSymbols' class='block mb-2'>
        Include Symbols (@#!$)
        <Toggle type='checkbox' id='includeSymbols' bind:checked={includeSymbols} />
      </Label>

      <Label for='includeLowercase' class='block mb-2'>
        Include Lowercase (a-z)
        <Toggle type='checkbox' id='includeLowercase' bind:checked={includeLowercase} />
      </Label>

      <Label for='includeUppercase' class='block mb-2'>
        Include Uppercase (A-Z)
        <Toggle type='checkbox' id='includeUppercase' bind:checked={includeUppercase} />
      </Label>
    </div>
  </form>
</Modal>

<SuccessToast bind:toastStatus/>
