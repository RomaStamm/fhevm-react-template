import { Router, Request, Response, NextFunction } from 'express';
import { FHEVMClient } from '@fhevm/sdk';
import type { EncryptedValue, DecryptionResult } from '@fhevm/sdk/types';

const router = Router();

// Initialize FHEVM client
const fhevmClient = new FHEVMClient({
  contractAddress: process.env.CONTRACT_ADDRESS || '0x',
  network: (process.env.NETWORK as 'sepolia' | 'mainnet' | 'localhost') || 'sepolia',
  aclAddress: process.env.ACL_ADDRESS,
});

// Initialize client on startup
let isInitialized = false;
let initError: string | null = null;

(async () => {
  try {
    await fhevmClient.init();
    isInitialized = true;
    console.log('✓ FHEVM client initialized');
  } catch (error) {
    initError = error instanceof Error ? error.message : 'Failed to initialize FHEVM client';
    console.error('✗ FHEVM initialization failed:', initError);
  }
})();

// Middleware to check if client is initialized
const ensureInitialized = (req: Request, res: Response, next: NextFunction) => {
  if (initError) {
    return res.status(500).json({
      error: 'FHEVM client initialization failed',
      message: initError,
    });
  }

  if (!isInitialized) {
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'FHEVM client is still initializing. Please try again.',
    });
  }

  next();
};

// GET /api/fhevm/status - Get FHEVM client status
router.get('/status', (req, res) => {
  res.json({
    initialized: isInitialized,
    error: initError,
    config: {
      contractAddress: process.env.CONTRACT_ADDRESS,
      network: process.env.NETWORK || 'sepolia',
    },
  });
});

// POST /api/fhevm/encrypt - Encrypt a value
router.post('/encrypt', ensureInitialized, async (req, res, next) => {
  try {
    const { value } = req.body;

    if (value === undefined || value === null) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Value is required',
      });
    }

    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(numValue)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Value must be a valid number',
      });
    }

    if (numValue < 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Value must be non-negative',
      });
    }

    const encrypted: EncryptedValue = await fhevmClient.encrypt(numValue);

    res.json({
      success: true,
      encrypted: {
        data: Array.from(encrypted.data), // Convert Uint8Array to regular array for JSON
        signature: encrypted.signature,
        metadata: encrypted.metadata,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/fhevm/decrypt - Decrypt a value
router.post('/decrypt', ensureInitialized, async (req, res, next) => {
  try {
    const { encryptedData, signature, isPublic = false } = req.body;

    if (!encryptedData || !signature) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'encryptedData and signature are required',
      });
    }

    // Reconstruct EncryptedValue
    const encrypted: EncryptedValue = {
      data: new Uint8Array(encryptedData),
      signature,
    };

    const result: DecryptionResult = isPublic
      ? await fhevmClient.publicDecrypt(encrypted)
      : await fhevmClient.userDecrypt(encrypted);

    res.json({
      success: true,
      decrypted: {
        value: result.value.toString(),
        decryptedAt: result.decryptedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/fhevm/batch-encrypt - Encrypt multiple values
router.post('/batch-encrypt', ensureInitialized, async (req, res, next) => {
  try {
    const { values } = req.body;

    if (!Array.isArray(values)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'values must be an array',
      });
    }

    if (values.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'values array cannot be empty',
      });
    }

    if (values.length > 100) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Maximum 100 values allowed per batch',
      });
    }

    const encryptedValues = await Promise.all(
      values.map(async (value) => {
        const encrypted = await fhevmClient.encrypt(value);
        return {
          original: value,
          encrypted: {
            data: Array.from(encrypted.data),
            signature: encrypted.signature,
            metadata: encrypted.metadata,
          },
        };
      })
    );

    res.json({
      success: true,
      count: encryptedValues.length,
      results: encryptedValues,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/fhevm/info - Get SDK and contract information
router.get('/info', ensureInitialized, (req, res) => {
  res.json({
    sdk: {
      version: '1.0.0',
      initialized: isInitialized,
    },
    contract: {
      address: process.env.CONTRACT_ADDRESS,
      network: process.env.NETWORK || 'sepolia',
    },
    capabilities: {
      encrypt: true,
      decrypt: true,
      batchEncrypt: true,
      publicDecrypt: true,
      userDecrypt: true,
    },
  });
});

export { router as fhevmRouter };
