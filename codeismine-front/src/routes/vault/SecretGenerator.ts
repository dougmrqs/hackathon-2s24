export type Requirements = {
  length: number,
  includeNumbers: boolean,
  includeSymbols: boolean,
  includeLowercase: boolean,
  includeUppercase: boolean
}

export function generateSecret(requirements: Requirements) {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = requirements;
  
  const charset = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    '!@#$%^&*()_+'
  ].filter((_, i) => [includeLowercase, includeUppercase, includeNumbers, includeSymbols][i]).join('');

  let secret = '';

  for (let i = 0; i < length; i++) {
    secret += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return secret;
}
