<script lang='ts'>
	import { onDestroy } from 'svelte';

  import Fa from 'svelte-fa'
  import copyToClipboard from 'copy-to-clipboard';
  import { createQuery } from '@tanstack/svelte-query'
  import { Spinner } from 'flowbite-svelte';

  import { faVault, faUser, faKey, faClock } from '@fortawesome/free-solid-svg-icons'
  import { Tooltip, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, TableSearch } from 'flowbite-svelte';

  import { fetchCredentials } from '../../lib/vault/api';
  import SuccessToast from './SuccessToast.svelte';

  let searchTerm = $state("");

  let query = createQuery({
    queryKey: ['credentials'],
    queryFn: () => fetchCredentials({ searchTerm })
  });

  // $effect(() => {
  //   query = createQuery({
  //     queryKey: ['credentials'],
  //     queryFn: () => fetchCredentials({ searchTerm })
  //   });
  // })

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

  onDestroy(() => {
    if (toastTimer) clearTimeout(toastTimer);
	});
</script>

<SuccessToast bind:toastStatus/>

<div class='flex w-full align-center'>
  <TableSearch divClass="w-full" innerDivClass="px-0" classInput="w-full" bind:inputValue={searchTerm}/>
  <Button class="ml-2" href="/vault/new">Add new</Button>
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
            <Button class="px-3" id='show-credentials'>
              <Fa icon={faVault}/>
            </Button>

            <Button class="px-3" id='copy-username' on:click={() => doCopyToClipboard(credential.username)}>
              <Fa icon={faUser}/>
            </Button>

            <Button class="px-3" id='copy-password' on:click={() => doCopyToClipboard(credential.password)}>
              <Fa icon={faKey}/>
            </Button>

            <Button class="px-3" id='copy-totp' on:click={() => doCopyToClipboard(credential.totp)} disabled>
              <Fa icon={faClock}/>
            </Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}

<Tooltip triggeredBy='#show-credentials'>
  Show/edit username and password
</Tooltip>

<Tooltip triggeredBy='#copy-username'>
  Copy username
</Tooltip>

<Tooltip triggeredBy='#copy-password'>
  Copy password
</Tooltip>

<Tooltip triggeredBy='#copy-totp'>
  Copy TOTP
</Tooltip>
