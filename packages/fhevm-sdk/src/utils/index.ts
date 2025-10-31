/**
 * Utility functions for FHEVM SDK
 */

export function toHexString(value: Uint8Array): string {
  return '0x' + Array.from(value)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function fromHexString(hex: string): Uint8Array {
  const cleaned = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.substr(i, 2), 16);
  }
  return bytes;
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateNetwork(network: string): boolean {
  const validNetworks = ['sepolia', 'mainnet', 'localhost'];
  return validNetworks.includes(network);
}
