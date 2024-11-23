<script lang='ts'>
  import Fa from 'svelte-fa'
  import SuccessToast from './success-toast.svelte';

  import { faVault, faUser, faKey, faClock } from '@fortawesome/free-solid-svg-icons'

  import { Tooltip, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  let credentials = [
    {
      id: 1,
      name: 'github',
      username: 'email@provider.com',
      password: 'very#sotrong#password',
      price: '134567',
    },
    {
      id: 2,
      name: 'Microsoft Outlook',
      username: 'emai2l@provider.com',
      password: 'very#sotrong#password',
      price: '123456',
    },
    {
      id: 3,
      name: 'PunchClock',
      username: 'emai2l@provider.com',
      password: 'very#sotrong#password',
      price: '123456',
    },
  ];

  let toastStatus = $state(false);

  const copyToClipboard = async (credential: string) => {
    console.log(toastStatus)
    try {
      await navigator.clipboard.writeText(credential);
      toastStatus = true;
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
</script>

<div>
  <Table hoverable={true}>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each credentials as credential}
        <TableBodyRow>
          <TableBodyCell>{credential.name}</TableBodyCell>
          <TableBodyCell>
            <Tooltip triggeredBy='#show-credentials'>
              Show/edit username and password
            </Tooltip>
            <Button id='show-credentials'>
              <Fa icon={faVault}/>
            </Button>
          </TableBodyCell>
          <TableBodyCell>
            <Tooltip triggeredBy='#copy-username'>
              Copy username
            </Tooltip>
            <Button id='copy-username' on:click={() => copyToClipboard(credential.username)}>
              <Fa icon={faUser}/>
            </Button>
          </TableBodyCell>
          <TableBodyCell>
            <Tooltip triggeredBy='#copy-password'>
              Copy password
            </Tooltip>
            <Button id='copy-password' on:click={() => copyToClipboard(credential.password)}>
              <Fa icon={faKey}/>
            </Button>
          </TableBodyCell>
          <TableBodyCell>
            <Tooltip triggeredBy='#copy-totp'>
              Copy TOTP
            </Tooltip>
            <Button id='copy-totp' disabled>
              <Fa icon={faClock}/>
            </Button>
          </TableBodyCell>
          <TableHeadCell>
            <span class="sr-only">Edit</span>
          </TableHeadCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <SuccessToast {toastStatus}/>
</div>