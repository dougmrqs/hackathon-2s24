import { TOTP } from 'totp-generator';

export function generate(key: string): string {
  // FIXED KEY
  const fixedKey = 'JBSWY3DPEHPK3PXP';
  const { otp } = TOTP.generate(fixedKey);

  return otp;
}
