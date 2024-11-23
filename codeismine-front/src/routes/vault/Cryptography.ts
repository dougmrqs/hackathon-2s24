import Crypto from 'crypto';

export function encrypt(data: string): string {
  const subtle = Crypto.subtle;

  const key = subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  return data;
}

export function decrypt(data: string): string {
  return data;
}
