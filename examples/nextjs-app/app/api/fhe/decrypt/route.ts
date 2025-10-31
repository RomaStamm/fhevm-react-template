/**
 * Decryption API Route
 * Dedicated endpoint for decrypting FHE-encrypted values
 */

import { NextRequest, NextResponse } from 'next/server';
import { FHEVMClient } from '@fhevm/sdk';

let fhevmClient: FHEVMClient | null = null;

async function getClient() {
  if (!fhevmClient) {
    fhevmClient = new FHEVMClient({
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x',
      network: 'sepolia'
    });
    await fhevmClient.init();
  }
  return fhevmClient;
}

export async function POST(request: NextRequest) {
  try {
    const { encrypted, publicKey } = await request.json();

    if (!encrypted) {
      return NextResponse.json(
        { error: 'Encrypted value is required for decryption' },
        { status: 400 }
      );
    }

    const client = await getClient();

    // Determine decryption method based on whether public key is provided
    let decrypted;
    if (publicKey) {
      decrypted = await client.publicDecrypt(encrypted);
    } else {
      decrypted = await client.userDecrypt(encrypted);
    }

    return NextResponse.json({
      success: true,
      data: {
        decrypted,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      {
        error: 'Decryption failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
