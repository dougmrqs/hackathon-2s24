<script lang='ts'>
	import { onDestroy } from 'svelte';

  import Fa from 'svelte-fa'
  import copyToClipboard from 'copy-to-clipboard';
  import { createQuery } from '@tanstack/svelte-query'
  import { Spinner } from 'flowbite-svelte';

  import { faVault, faUser, faKey, faClock, faLock } from '@fortawesome/free-solid-svg-icons'
  import { Tooltip, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, TableSearch } from 'flowbite-svelte';

  import { fetchCredentials } from '../../lib/vault/api';
  import SuccessToast from './SuccessToast.svelte';
	import TotpModal from './TOTPModal.svelte';
	import { sessionTimeoutTimer } from '$lib/session';

  import * as TOTPGenerator from '../vault/TOTPGenerator';
	import { goto } from '$app/navigation';

  let showTotpModal = $state(false);
  let totpValue = $state("");

  let searchTerm = $state("");

  let query = createQuery({
    queryKey: ['credentials'],
    queryFn: () => fetchCredentials({ searchTerm })
  });

  let toastStatus = $state(false);
  let toastTimer: number;

  const triggerSuccessToast = () => {
    if (toastTimer) clearTimeout(toastTimer);

    toastStatus = true;

    toastTimer = setTimeout(() => { toastStatus = false }, 4000);
  }

  const doCopyToClipboard = async (credential: string) => {
    try {
      copyToClipboard(credential);
      triggerSuccessToast();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const toggleTotpModal = (totpKey: string) => {
    // currently using password as totpKey. Need to support totp key in the backend.
    showTotpModal = !showTotpModal;
    totpValue = TOTPGenerator.generate(totpKey);
  }

  onDestroy(() => {
    if (toastTimer) clearTimeout(toastTimer);
	});

  const logout = () => {
    sessionTimeoutTimer.set(null);
		localStorage.removeItem('token');
		goto('/lock');
  }
</script>

<SuccessToast bind:toastStatus/>

<TotpModal showModal={showTotpModal} totpValue={totpValue || '000000'}/>

<div class='flex w-full align-center'>
  <TableSearch divClass="w-full" innerDivClass="px-0" classInput="w-full" bind:inputValue={searchTerm}/>
  <Button class="ml-2 font-bold" href="/vault/new">New</Button>

  <Button color='red' class='ml-2 font-bold' on:click={logout}>
    <Fa icon={faLock}/>
  </Button>
</div>

{#if $query.isLoading || $query.isFetching}
  <Spinner size={12} class="mt-8"/>
{:else if $query.isError}
  <p>{$query.error.message}</p>
{:else if $query.isSuccess}
  <Table divClass="relative overflow-x-auto rounded-md w-full mt-4" hoverable={true}>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>User</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Actions</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each $query.data as credential}
        <TableBodyRow>
          <TableBodyCell class="font-bold">{credential.name}</TableBodyCell>
          <TableBodyCell>{credential.username}</TableBodyCell>
          <TableBodyCell class="gap-x-2 flex justify-end">
            <Button disabled class="px-3" id='show-credentials'>
              <Fa icon={faVault}/>
            </Button>
            <Button class="px-3" id='copy-username' on:click={() => doCopyToClipboard(credential.username)}>
              <Fa icon={faUser}/>
            </Button>
            <Button class="px-3" id='copy-password' on:click={() => doCopyToClipboard(credential.password)}>
              <Fa icon={faKey}/>
            </Button>
            <Button class="px-3" id='show-totp' on:click={() => toggleTotpModal(credential.password)}>
              <Fa icon={faClock}/>
            </Button>

            <Tooltip triggeredBy='#show-credentials'>
              Show/edit username and password
            </Tooltip>
            <Tooltip triggeredBy='#show-totp'>
              Show TOTP
            </Tooltip>
            <Tooltip triggeredBy='#copy-password'>
              Copy password
            </Tooltip>
            <Tooltip triggeredBy='#copy-username'>
              Copy username
            </Tooltip>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}

