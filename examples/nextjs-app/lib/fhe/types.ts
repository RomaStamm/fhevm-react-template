/**
 * FHE Type Definitions
 * TypeScript types for FHE operations
 */

export interface FHEConfig {
  contractAddress: string;
  network: string;
}

export interface EncryptedValue {
  data: any;
  type: string;
  timestamp: string;
}

export interface DecryptedValue {
  value: number;
  timestamp: string;
}

export interface FHEKeyInfo {
  publicKey: string;
  network: string;
  timestamp: string;
}

export interface ComputationResult {
  operation: string;
  result: any;
  message: string;
  timestamp: string;
}

export type FHEOperation = 'encrypt' | 'decrypt' | 'compute';
export type ComputationOp = 'add' | 'subtract' | 'multiply';

export interface FHEAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
