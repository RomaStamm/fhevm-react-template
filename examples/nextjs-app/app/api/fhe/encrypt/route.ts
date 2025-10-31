/**
 * Encryption API Route
 * Dedicated endpoint for encrypting values using FHE
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
    const { value, type } = await request.json();

    if (value === undefined) {
      return NextResponse.json(
        { error: 'Value is required for encryption' },
        { status: 400 }
      );
    }

    const client = await getClient();
    const encrypted = await client.encrypt(value);

    return NextResponse.json({
      success: true,
      data: {
        encrypted,
        type: type || 'uint32',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      {
        error: 'Encryption failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
