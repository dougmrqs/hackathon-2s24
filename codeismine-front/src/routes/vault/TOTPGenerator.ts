import { TOTP } from 'totp-generator';

export function generate(key: string): string {
  const { otp } = TOTP.generate(key);

  return otp;
}
