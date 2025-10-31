/**
 * FHE-related TypeScript Types
 * Type definitions specific to FHE operations in this application
 */

export interface FHEEncryptionResult {
  encrypted: any;
  type: string;
  timestamp: string;
}

export interface FHEDecryptionResult {
  decrypted: number;
  timestamp: string;
}

export interface FHEComputationResult {
  operation: string;
  result: any;
  message: string;
  timestamp: string;
}

export interface FHEKeyInformation {
  publicKey: string;
  network: string;
  timestamp: string;
}

export type FHEOperationType = 'encrypt' | 'decrypt' | 'compute';
export type FHEComputationOp = 'add' | 'subtract' | 'multiply' | 'divide';

export interface FHEClientConfig {
  contractAddress: string;
  network: 'sepolia' | 'mainnet' | 'localhost';
}

export interface FHEProviderConfig extends FHEClientConfig {
  autoInit?: boolean;
}
