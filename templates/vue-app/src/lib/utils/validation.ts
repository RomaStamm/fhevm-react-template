/**
 * Validation Utilities for Vue
 */

export function validateNumericInput(value: any): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }

  if (typeof value === 'string') {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  }

  return false;
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}
