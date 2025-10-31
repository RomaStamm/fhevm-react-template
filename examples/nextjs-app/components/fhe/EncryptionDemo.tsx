/**
 * Encryption Demo Component
 * Interactive demonstration of FHE encryption functionality
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const EncryptionDemo: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [encryptedValue, setEncryptedValue] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { encrypt, isInitialized } = useEncrypt();

  const handleEncrypt = async () => {
    if (!value) return;

    setIsProcessing(true);
    try {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue)) {
        alert('Please enter a valid number');
        return;
      }

      const encrypted = await encrypt(numValue);
      setEncryptedValue(encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Encryption failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt data using Fully Homomorphic Encryption">
      <div className="space-y-4">
        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number (e.g., 42)"
          disabled={!isInitialized || isProcessing}
          helperText="This value will be encrypted and can be used in smart contracts"
        />

        <Button
          onClick={handleEncrypt}
          disabled={!value || !isInitialized || isProcessing}
          isLoading={isProcessing}
          className="w-full"
        >
          Encrypt Value
        </Button>

        {encryptedValue && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Encrypted Result:</h4>
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {JSON.stringify(encryptedValue, null, 2)}
            </pre>
          </div>
        )}

        {!isInitialized && (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded">
            SDK is initializing... Please wait.
          </div>
        )}
      </div>
    </Card>
  );
};
