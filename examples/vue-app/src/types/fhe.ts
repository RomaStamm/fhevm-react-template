/**
 * FHE Type Definitions for Vue
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

export type FHEOperation = 'encrypt' | 'decrypt' | 'compute';
export type ComputationOp = 'add' | 'subtract' | 'multiply';
