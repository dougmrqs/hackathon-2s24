<script>
	import { Card, Modal } from 'flowbite-svelte';

  let { showModal = $bindable(), totpValue } = $props();
</script>

<Modal class='max-w-30vw' title="TOTP" bind:open={showModal} outsideclose autoclose>
  <Card>
    <div class="flex justify-center">
      <span class='text-xl'>{totpValue}</span>
    </div>
  </Card>
</Modal>
