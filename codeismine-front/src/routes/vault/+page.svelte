<script>
  import Fa from 'svelte-fa'

  import { faVault, faUser, faKey, faClock } from '@fortawesome/free-solid-svg-icons'

  import { Tooltip, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  let passwords = [
    {
      id: 1,
      name: 'Apple MacBook Pro 17"',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      id: 2,
      name: 'Microsoft Surface Pro',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      id: 3,
      name: 'Magic Mouse 2',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
  ];
</script>

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
    {#each passwords as password}
      <TableBodyRow>
        <TableBodyCell>{password.name}</TableBodyCell>
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
          <Button id='copy-username'>
            <Fa icon={faUser}/>
          </Button>
        </TableBodyCell>
        <TableBodyCell>
          <Tooltip triggeredBy='#copy-password'>
            Copy password
          </Tooltip>
          <Button id='copy-password'>
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
