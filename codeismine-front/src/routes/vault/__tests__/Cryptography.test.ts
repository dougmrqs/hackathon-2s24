import { describe, it, expect } from 'vitest';
import * as Cryptography from '../Cryptography';

describe('Cryptography', () => {
  describe('encrypt', () => {
    it('should encrypt the data', () => {
      const data = 'mypassword';

      const encrypted = Cryptography.encrypt(data);

      expect(encrypted).not.toBe(data);
    });
  });

  describe('decrypt', () => {
    it('should decrypt the data', () => {
      const data = 'mypassword';
      const encrypted = Cryptography.encrypt(data);

      const decrypted = Cryptography.decrypt(encrypted);

      expect(decrypted).toBe(data);
    });
  });
});
