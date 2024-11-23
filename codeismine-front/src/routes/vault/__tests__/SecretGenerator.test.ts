import { describe, expect } from 'vitest';
import { generateSecret } from '../SecretGenerator';

function makeRequirements(overrides = {}) {
  return {
    length: 8,
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
    ...overrides
  };
}

describe('generateSecret', () => {
  const requirements = makeRequirements();

  it('generates a secret with the specified length', () => {
    const secret = generateSecret(requirements);
    expect(secret.length).toBe(8);
  });

  it('generates a secret with uppercase letters', () => {
    const secret = generateSecret(makeRequirements({ includeUppercase: true }));
    expect(secret).toMatch(/[A-Z]/);
  });

  it('generates a secret with lowercase letters', () => {
    const secret = generateSecret(makeRequirements({ includeLowercase: true }));
    expect(secret).toMatch(/[a-z]/);
  });

  it('generates a secret with numbers', () => {
    const secret = generateSecret(makeRequirements({ includeNumbers: true, includeLowercase: false }));
    expect(secret).toMatch(/[0-9]/);
  });

  it('generates a secret with symbols', () => {
    const secret = generateSecret(makeRequirements({ includeSymbols: true }));
    expect(secret).toMatch(/[!@#$%^&*()_+]/);
  });

  it('generates a secret with all character types', () => {
    const secret = generateSecret(makeRequirements({
      length: 150,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    }));
    expect(secret).toMatch(/[A-Z]/);
    expect(secret).toMatch(/[a-z]/);
    expect(secret).toMatch(/[0-9]/);
    expect(secret).toMatch(/[!@#$%^&*()_+]/);
  });
});
