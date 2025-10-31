/**
 * Security Utilities
 * Security-related helper functions
 */

/**
 * Validate numeric input to prevent injection attacks
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

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Rate limiting helper (client-side)
 */
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }

    return false;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return this.maxRequests - this.requests.length;
  }
}

/**
 * Generate secure random ID
 */
export function generateSecureId(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
