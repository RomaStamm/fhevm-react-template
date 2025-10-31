/**
 * API Type Definitions
 * TypeScript types for API requests and responses
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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
  publicKey?: string;
}

export interface DecryptResponse {
  decrypted: number;
  timestamp: string;
}

export interface ComputeRequest {
  operation: string;
  operands: any[];
}

export interface ComputeResponse {
  operation: string;
  result: any;
  message: string;
  timestamp: string;
}

export interface KeysResponse {
  publicKey: string;
  network: string;
  timestamp: string;
}

export interface FHEStatusResponse {
  initialized: boolean;
  network: string;
}
