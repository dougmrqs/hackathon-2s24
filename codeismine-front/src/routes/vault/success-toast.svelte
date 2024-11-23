<script>
  import { Toast } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';

  // export let toastStatus = false;
  let { toastStatus = $bindable() } = $props(); 
</script>

<Toast color="green" bind:toastStatus on:close={() => toastStatus = false}>
  <svelte:fragment slot="icon">
    <CheckCircleSolid class="w-5 h-5" />
    <span class="sr-only">Check icon</span>
  </svelte:fragment>
  Successfully copied to clipboard.
</Toast>
