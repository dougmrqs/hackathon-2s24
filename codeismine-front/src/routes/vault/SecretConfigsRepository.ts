type SecretsConfig = {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
}

export function getSecretsConfig(): SecretsConfig | undefined {
  try {
    return JSON.parse(localStorage.getItem('passwordGeneratorSettings') || '');
  } catch (_) {
    return undefined;
  }
}
