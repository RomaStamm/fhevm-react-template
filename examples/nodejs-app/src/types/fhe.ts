/**
 * FHE Type Definitions for Node.js Backend
 */

export interface FHEConfig {
  contractAddress: string;
  network: string;
}

export interface EncryptRequest {
  value: number;
  type?: string;
}

export interface EncryptResponse {
  encrypted: any;
  type: string;
  timestamp: string;
}

export interface DecryptRequest {
  encrypted: any;
  isPublic?: boolean;
}

export interface DecryptResponse {
  decrypted: number;
  timestamp: string;
}

export interface BatchEncryptRequest {
  values: number[];
}

export interface BatchEncryptResponse {
  encrypted: any[];
  count: number;
  timestamp: string;
}

export interface BatchDecryptRequest {
  encrypted: any[];
  isPublic?: boolean;
}

export interface BatchDecryptResponse {
  decrypted: number[];
  count: number;
  timestamp: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
