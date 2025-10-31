/**
 * FHE Key Management
 * Utilities for managing FHE public and private keys
 */

/**
 * Retrieve the FHE public key from the contract or network
 */
export async function getFHEPublicKey(): Promise<string> {
  try {
    const response = await fetch('/api/keys');
    const data = await response.json();

    if (data.success && data.data.publicKey) {
      return data.data.publicKey;
    }

    throw new Error('Failed to retrieve public key');
  } catch (error) {
    console.error('Error fetching public key:', error);
    throw error;
  }
}

/**
 * Verify key validity
 */
export function verifyPublicKey(publicKey: string): boolean {
  // Add validation logic here
  return publicKey && publicKey.length > 0;
}

/**
 * Store public key in session storage for quick access
 */
export function cachePublicKey(publicKey: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('fhe_public_key', publicKey);
  }
}

/**
 * Retrieve cached public key
 */
export function getCachedPublicKey(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('fhe_public_key');
  }
  return null;
}

/**
 * Clear cached key
 */
export function clearCachedKey(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('fhe_public_key');
  }
}
