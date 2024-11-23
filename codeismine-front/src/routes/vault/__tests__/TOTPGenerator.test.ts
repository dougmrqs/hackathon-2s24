import { describe, expect, it } from 'vitest';
import * as TOTPGenerator from '../TOTPGenerator';

describe('TOTPGenerator', () => {
  describe('generate', () => {
    it('generates a six-digit TOTP', () => {
      const secret = 'mysecret';

      const totp = TOTPGenerator.generate(secret);

      expect(totp.length).toBe(6);
    });
  });
});
