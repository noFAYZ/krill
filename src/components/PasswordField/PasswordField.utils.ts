export enum PasswordStrength {
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  STRONG = 'strong'
}

export const PASSWORD_STRENGTH_LABEL: Record<PasswordStrength, string> = {
  [PasswordStrength.WEAK]: 'Weak',
  [PasswordStrength.FAIR]: 'Fair',
  [PasswordStrength.GOOD]: 'Good',
  [PasswordStrength.STRONG]: 'Strong'
};

export const PASSWORD_STRENGTH_COLOR: Record<PasswordStrength, string> = {
  [PasswordStrength.WEAK]: 'var(--accent-red-primary)',
  [PasswordStrength.FAIR]: 'var(--accent-yellow-primary)',
  [PasswordStrength.GOOD]: 'var(--accent-blue-primary)',
  [PasswordStrength.STRONG]: 'var(--accent-green-primary)'
};

const STRENGTH_ORDER = [PasswordStrength.WEAK, PasswordStrength.FAIR, PasswordStrength.GOOD, PasswordStrength.STRONG];

/**
 * A simple checklist heuristic (length + character variety), not a real entropy estimate.
 * ponytail: swap for a proper estimator (e.g. zxcvbn) if this needs to drive real security decisions.
 */
export const getPasswordStrength = (password: string): { score: number; strength: PasswordStrength } => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  const index = Math.min(Math.floor(score / 1.25), STRENGTH_ORDER.length - 1);
  return { score, strength: STRENGTH_ORDER[Math.max(index, 0)] };
};
