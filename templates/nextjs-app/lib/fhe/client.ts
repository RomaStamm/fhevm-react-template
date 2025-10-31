/**
 * Client-side FHE Operations
 * Utility functions for client-side FHE encryption and decryption
 */

import { FHEVMClient } from '@fhevm/sdk';

let clientInstance: FHEVMClient | null = null;

/**
 * Initialize FHE client for browser usage
 */
export async function initFHEClient(config: {
  contractAddress: string;
  network: string;
}): Promise<FHEVMClient> {
  if (clientInstance) {
    return clientInstance;
  }

  clientInstance = new FHEVMClient(config);
  await clientInstance.init();
  return clientInstance;
}

/**
 * Get the current FHE client instance
 */
export function getFHEClient(): FHEVMClient | null {
  return clientInstance;
}

/**
 * Encrypt a value using the FHE client
 */
export async function encryptValue(value: number): Promise<any> {
  if (!clientInstance) {
    throw new Error('FHE client not initialized. Call initFHEClient first.');
  }

  return await clientInstance.encrypt(value);
}

/**
 * Decrypt a value for the current user
 */
export async function decryptValue(encrypted: any): Promise<number> {
  if (!clientInstance) {
    throw new Error('FHE client not initialized. Call initFHEClient first.');
  }

  return await clientInstance.userDecrypt(encrypted);
}

/**
 * Perform public decryption (for publicly accessible encrypted values)
 */
export async function publicDecrypt(encrypted: any): Promise<number> {
  if (!clientInstance) {
    throw new Error('FHE client not initialized. Call initFHEClient first.');
  }

  return await clientInstance.publicDecrypt(encrypted);
}
