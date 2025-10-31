/**
 * FHE Client for Node.js Backend
 * Server-side FHE operations
 */

import { FHEVMClient } from '@fhevm/sdk';

let clientInstance: FHEVMClient | null = null;

export async function initFHEClient(): Promise<FHEVMClient> {
  if (clientInstance) {
    return clientInstance;
  }

  const config = {
    contractAddress: process.env.CONTRACT_ADDRESS || '0x',
    network: 'sepolia'
  };

  clientInstance = new FHEVMClient(config);
  await clientInstance.init();

  console.log('FHE Client initialized successfully');
  return clientInstance;
}

export function getFHEClient(): FHEVMClient | null {
  return clientInstance;
}

export async function encryptValue(value: number): Promise<any> {
  if (!clientInstance) {
    await initFHEClient();
  }

  return await clientInstance!.encrypt(value);
}

export async function decryptValue(encrypted: any, isPublic: boolean = false): Promise<number> {
  if (!clientInstance) {
    await initFHEClient();
  }

  if (isPublic) {
    return await clientInstance!.publicDecrypt(encrypted);
  }

  return await clientInstance!.userDecrypt(encrypted);
}

export async function batchEncrypt(values: number[]): Promise<any[]> {
  if (!clientInstance) {
    await initFHEClient();
  }

  return await Promise.all(values.map(v => clientInstance!.encrypt(v)));
}

export async function batchDecrypt(encryptedValues: any[], isPublic: boolean = false): Promise<number[]> {
  if (!clientInstance) {
    await initFHEClient();
  }

  if (isPublic) {
    return await Promise.all(encryptedValues.map(e => clientInstance!.publicDecrypt(e)));
  }

  return await Promise.all(encryptedValues.map(e => clientInstance!.userDecrypt(e)));
}
