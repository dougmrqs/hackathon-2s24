<script>
  import { Toast } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';

  let { toastStatus = $bindable(false) } = $props();
</script>

<Toast position="top-right" color="green" bind:toastStatus on:close={() => toastStatus = false}>
  <svelte:fragment slot="icon">
    <CheckCircleSolid class="w-5 h-5" />
    <span class="sr-only">Check icon</span>
  </svelte:fragment>
  Successfully copied to clipboard.
</Toast>
