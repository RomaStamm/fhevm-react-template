/**
 * FHE Operations API Route
 * Main route for handling FHE encryption and decryption operations
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
    const { operation, value } = await request.json();

    if (!operation) {
      return NextResponse.json(
        { error: 'Operation type is required' },
        { status: 400 }
      );
    }

    const client = await getClient();

    switch (operation) {
      case 'encrypt':
        if (value === undefined) {
          return NextResponse.json(
            { error: 'Value is required for encryption' },
            { status: 400 }
          );
        }
        const encrypted = await client.encrypt(value);
        return NextResponse.json({
          success: true,
          data: encrypted
        });

      case 'status':
        return NextResponse.json({
          success: true,
          data: {
            initialized: client !== null,
            network: 'sepolia'
          }
        });

      default:
        return NextResponse.json(
          { error: `Unknown operation: ${operation}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('FHE API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await getClient();
    return NextResponse.json({
      success: true,
      data: {
        initialized: client !== null,
        network: 'sepolia'
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to initialize FHE client',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
