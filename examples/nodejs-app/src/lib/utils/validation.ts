/**
 * Validation Utilities for Node.js
 */

export function validateNumericInput(value: any): { valid: boolean; error?: string } {
  if (value === undefined || value === null) {
    return { valid: false, error: 'Value is required' };
  }

  if (typeof value === 'number') {
    if (isNaN(value)) {
      return { valid: false, error: 'Value must be a valid number' };
    }
    if (!isFinite(value)) {
      return { valid: false, error: 'Value must be finite' };
    }
    return { valid: true };
  }

  if (typeof value === 'string') {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { valid: false, error: 'Value must be a valid number' };
    }
    return validateNumericInput(num);
  }

  return { valid: false, error: 'Value must be a number or numeric string' };
}

export function validateArrayOfNumbers(values: any): { valid: boolean; error?: string } {
  if (!Array.isArray(values)) {
    return { valid: false, error: 'Values must be an array' };
  }

  if (values.length === 0) {
    return { valid: false, error: 'Array must not be empty' };
  }

  if (values.length > 100) {
    return { valid: false, error: 'Array must not exceed 100 items' };
  }

  for (const value of values) {
    const validation = validateNumericInput(value);
    if (!validation.valid) {
      return validation;
    }
  }

  return { valid: true };
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
