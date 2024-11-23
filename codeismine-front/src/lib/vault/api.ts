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

export const fetchCredentials = async (_props: FetchCredentialsProps): Promise<Credential[]> => {
  const response = await fetch('http://localhost:8000/api/v1/credentials/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token'),
    }
  })
  return (await response.json()).results
}
