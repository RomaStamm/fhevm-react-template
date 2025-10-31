/**
 * FHE Client Library for Vue
 * Client-side FHE operations utilities
 */

import { FHEVMClient } from '@fhevm/sdk';

let clientInstance: FHEVMClient | null = null;

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

export function getFHEClient(): FHEVMClient | null {
  return clientInstance;
}

export async function encryptValue(value: number): Promise<any> {
  if (!clientInstance) {
    throw new Error('FHE client not initialized');
  }

  return await clientInstance.encrypt(value);
}

export async function decryptValue(encrypted: any): Promise<number> {
  if (!clientInstance) {
    throw new Error('FHE client not initialized');
  }

  return await clientInstance.userDecrypt(encrypted);
}
