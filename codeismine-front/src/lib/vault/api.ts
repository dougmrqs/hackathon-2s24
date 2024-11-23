type FetchCredentialsProps = {
  searchTerm?: string
}

type Credential = {
  id: string;
  name: string;
  username: string;
  password: string;
  totp: string;
}

export const fetchCredentials = async (_props: FetchCredentialsProps) => {
  return new Promise<Credential[]>(
    (resolve) => setTimeout(() => resolve([
      {
        id: '1',
        name: 'GitHub',
        username: 'email@provider.com',
        password: 'very#sotrong#password',
        totp: '134567',
      },
      {
        id: '2',
        name: 'Microsoft Outlook',
        username: 'emai2l@provider.com',
        password: 'very#sotrong#password',
        totp: '123456',
      },
      {
        id: '3',
        name: 'PunchClock',
        username: 'emai2l@provider.com',
        password: 'very#sotrong#password',
        totp: '123456',
      },
    ]
  ), 2000))
}