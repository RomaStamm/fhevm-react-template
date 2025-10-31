/**
 * Server-side FHE Operations
 * Utility functions for server-side FHE operations in API routes
 */

import { FHEVMClient } from '@fhevm/sdk';

let serverClientInstance: FHEVMClient | null = null;

/**
 * Initialize FHE client for server-side usage
 */
export async function initServerFHEClient(): Promise<FHEVMClient> {
  if (serverClientInstance) {
    return serverClientInstance;
  }

  const config = {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x',
    network: 'sepolia'
  };

  serverClientInstance = new FHEVMClient(config);
  await serverClientInstance.init();
  return serverClientInstance;
}

/**
 * Get the server FHE client instance
 */
export function getServerFHEClient(): FHEVMClient | null {
  return serverClientInstance;
}

/**
 * Server-side encryption
 */
export async function serverEncrypt(value: number): Promise<any> {
  const client = await initServerFHEClient();
  return await client.encrypt(value);
}

/**
 * Server-side decryption
 */
export async function serverDecrypt(encrypted: any, isPublic: boolean = false): Promise<number> {
  const client = await initServerFHEClient();

  if (isPublic) {
    return await client.publicDecrypt(encrypted);
  }

  return await client.userDecrypt(encrypted);
}

/**
 * Batch encrypt multiple values
 */
export async function batchEncrypt(values: number[]): Promise<any[]> {
  const client = await initServerFHEClient();
  return await Promise.all(values.map(v => client.encrypt(v)));
}
