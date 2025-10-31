/**
 * Validation Utilities
 * Input validation and data verification functions
 */

/**
 * Validate encryption value
 */
export function validateEncryptionValue(value: any): { valid: boolean; error?: string } {
  if (value === undefined || value === null) {
    return { valid: false, error: 'Value is required' };
  }

  if (typeof value === 'number') {
    if (isNaN(value)) {
      return { valid: false, error: 'Value must be a valid number' };
    }
    if (!isFinite(value)) {
      return { valid: false, error: 'Value must be finite' };
    }
    if (value < 0) {
      return { valid: false, error: 'Value must be non-negative' };
    }
    return { valid: true };
  }

  if (typeof value === 'string') {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { valid: false, error: 'Value must be a valid number' };
    }
    return validateEncryptionValue(num);
  }

  return { valid: false, error: 'Value must be a number or numeric string' };
}

/**
 * Validate contract address
 */
export function validateContractAddress(address: string): { valid: boolean; error?: string } {
  if (!address) {
    return { valid: false, error: 'Contract address is required' };
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: 'Invalid Ethereum address format' };
  }

  return { valid: true };
}

/**
 * Validate network name
 */
export function validateNetwork(network: string): { valid: boolean; error?: string } {
  const validNetworks = ['sepolia', 'mainnet', 'localhost', 'hardhat'];

  if (!network) {
    return { valid: false, error: 'Network is required' };
  }

  if (!validNetworks.includes(network.toLowerCase())) {
    return { valid: false, error: `Network must be one of: ${validNetworks.join(', ')}` };
  }

  return { valid: true };
}

/**
 * Validate API response
 */
export function validateAPIResponse(response: any): boolean {
  return (
    response &&
    typeof response === 'object' &&
    'success' in response &&
    typeof response.success === 'boolean'
  );
}

/**
 * Validate encrypted data structure
 */
export function validateEncryptedData(data: any): { valid: boolean; error?: string } {
  if (!data) {
    return { valid: false, error: 'Encrypted data is required' };
  }

  // Add more specific validation based on your encrypted data structure
  return { valid: true };
}
