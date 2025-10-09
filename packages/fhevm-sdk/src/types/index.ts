/**
 * Type definitions for FHEVM SDK
 */

export interface FHEVMConfig {
  /** Contract address for FHEVM operations */
  contractAddress: string;

  /** Network to connect to */
  network?: 'sepolia' | 'mainnet' | 'localhost';

  /** RPC provider URL */
  provider?: string;

  /** ACL contract address (optional) */
  aclAddress?: string;

  /** Gateway URL for decryption (optional) */
  gatewayUrl?: string;
}

export interface EncryptedValue {
  /** Encrypted data as Uint8Array */
  data: Uint8Array;

  /** EIP-712 signature for the encrypted data */
  signature: string;

  /** Optional metadata */
  metadata?: {
    encryptedAt?: number;
    encryptedBy?: string;
  };
}

export interface DecryptionResult {
  /** Decrypted value */
  value: number;

  /** Optional proof of decryption */
  proof?: string;

  /** Optional metadata */
  metadata?: {
    decryptedAt?: number;
    decryptedBy?: string;
  };
}

export interface EncryptionOptions {
  /** Type of encryption (euint8, euint16, euint32, etc.) */
  type?: 'euint8' | 'euint16' | 'euint32' | 'euint64';

  /** Whether to include signature */
  includeSignature?: boolean;
}

export interface DecryptionOptions {
  /** Whether to use public or user decryption */
  isPublic?: boolean;

  /** Whether to verify proof */
  verifyProof?: boolean;
}

export type FHEVMError = {
  code: string;
  message: string;
  details?: any;
};

export type FHEVMStatus = 'idle' | 'initializing' | 'ready' | 'error';

// React-specific types
export interface FHEVMContextValue {
  config: FHEVMConfig;
  status: FHEVMStatus;
  error: Error | null;
  client: any; // FHEVMClient type
}

// Vue-specific types
export interface FHEVMPlugin {
  install(app: any, options: FHEVMConfig): void;
}
