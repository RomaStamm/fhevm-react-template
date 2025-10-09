/**
 * FHEVM Client - Core encryption/decryption client
 * Framework-agnostic implementation
 */

import { ethers } from 'ethers';
import type { FHEVMConfig, EncryptedValue, DecryptionResult } from '../types';

export class FHEVMClient {
  private config: FHEVMConfig;
  private provider: ethers.Provider | null = null;
  private contract: ethers.Contract | null = null;
  private isReady: boolean = false;

  constructor(config: FHEVMConfig) {
    this.config = config;
  }

  /**
   * Initialize the FHEVM client
   */
  async init(): Promise<void> {
    try {
      // Initialize provider
      if (this.config.provider) {
        this.provider = new ethers.JsonRpcProvider(this.config.provider);
      } else if (typeof window !== 'undefined' && (window as any).ethereum) {
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
      } else {
        throw new Error('No provider available');
      }

      // Initialize contract if address provided
      if (this.config.contractAddress) {
        const signer = await this.getSigner();
        this.contract = new ethers.Contract(
          this.config.contractAddress,
          [], // ABI would go here
          signer
        );
      }

      this.isReady = true;
    } catch (error) {
      console.error('Failed to initialize FHEVM client:', error);
      throw error;
    }
  }

  /**
   * Get signer from provider
   */
  private async getSigner(): Promise<ethers.Signer> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    if (this.provider instanceof ethers.BrowserProvider) {
      return await this.provider.getSigner();
    }

    throw new Error('Cannot get signer from provider');
  }

  /**
   * Encrypt a value using FHE
   */
  async encrypt(value: number | bigint): Promise<EncryptedValue> {
    if (!this.isReady) {
      throw new Error('Client not initialized. Call init() first');
    }

    try {
      // In real implementation, this would use fhevmjs to encrypt
      // For demonstration, we show the structure
      const encrypted = {
        data: new Uint8Array(Buffer.from(value.toString())),
        signature: await this.signEncryptedData(value)
      };

      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  /**
   * Sign encrypted data with EIP-712
   */
  private async signEncryptedData(value: number | bigint): Promise<string> {
    const signer = await this.getSigner();

    // EIP-712 signature structure
    const domain = {
      name: 'FHEVM',
      version: '1',
      chainId: await (await signer.provider?.getNetwork())?.chainId || 11155111,
      verifyingContract: this.config.contractAddress
    };

    const types = {
      Encryption: [
        { name: 'value', type: 'uint256' }
      ]
    };

    const message = {
      value: value.toString()
    };

    return await signer.signTypedData(domain, types, message);
  }

  /**
   * Decrypt a value (user-specific decryption)
   */
  async userDecrypt(encrypted: EncryptedValue): Promise<DecryptionResult> {
    if (!this.isReady) {
      throw new Error('Client not initialized');
    }

    try {
      // In real implementation, use fhevmjs userDecrypt
      const value = parseInt(Buffer.from(encrypted.data).toString());

      return {
        value,
        proof: encrypted.signature
      };
    } catch (error) {
      console.error('User decryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt a value (public decryption)
   */
  async publicDecrypt(encrypted: EncryptedValue): Promise<DecryptionResult> {
    if (!this.isReady) {
      throw new Error('Client not initialized');
    }

    try {
      // In real implementation, use fhevmjs publicDecrypt
      const value = parseInt(Buffer.from(encrypted.data).toString());

      return {
        value
      };
    } catch (error) {
      console.error('Public decryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt a value (convenience method)
   */
  async decrypt(encrypted: EncryptedValue, isPublic: boolean = false): Promise<number> {
    const result = isPublic
      ? await this.publicDecrypt(encrypted)
      : await this.userDecrypt(encrypted);

    return result.value;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.isReady;
  }

  /**
   * Get current configuration
   */
  getConfig(): FHEVMConfig {
    return { ...this.config };
  }

  /**
   * Get contract instance
   */
  getContract(): ethers.Contract | null {
    return this.contract;
  }
}
