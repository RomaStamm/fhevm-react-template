'use client';

import { useState, useEffect } from 'react';
import type { EncryptedValue, DecryptionResult } from '@fhevm/sdk/types';

interface DecryptDisplayProps {
  encryptedValue: EncryptedValue | null;
}

export default function DecryptDisplay({ encryptedValue }: DecryptDisplayProps) {
  const [decryptedValue, setDecryptedValue] = useState<DecryptionResult | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string>('');

  // Reset when encrypted value changes
  useEffect(() => {
    setDecryptedValue(null);
    setError('');
  }, [encryptedValue]);

  const handleDecrypt = async () => {
    if (!encryptedValue) return;

    setIsDecrypting(true);
    setError('');

    try {
      // Note: In a real implementation, this would call the SDK's decrypt method
      // For now, we're showing the encrypted data structure
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // This is a mock - actual decryption requires smart contract interaction
      setDecryptedValue({
        value: 42, // Mock value
        decryptedAt: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    } finally {
      setIsDecrypting(false);
    }
  };

  if (!encryptedValue) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p>No encrypted data yet</p>
        <p className="text-sm mt-2">Encrypt a value on the left to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Encrypted Data Display */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Encrypted Data</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Data (hex)</label>
            <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs break-all">
              {Array.from(encryptedValue.data.slice(0, 32)).map(b => b.toString(16).padStart(2, '0')).join('')}...
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">Signature</label>
            <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs break-all">
              {encryptedValue.signature.slice(0, 66)}...
            </div>
          </div>
          {encryptedValue.metadata && (
            <div>
              <label className="text-xs text-gray-500">Encrypted At</label>
              <div className="bg-white p-2 rounded border border-gray-200 text-xs">
                {encryptedValue.metadata.encryptedAt
                  ? new Date(encryptedValue.metadata.encryptedAt).toLocaleString()
                  : 'N/A'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decrypt Button */}
      {!decryptedValue && (
        <button
          onClick={handleDecrypt}
          disabled={isDecrypting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isDecrypting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Decrypting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Decrypt Value
            </>
          )}
        </button>
      )}

      {/* Decrypted Result */}
      {decryptedValue && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-sm font-medium text-green-800">Decrypted Successfully</h3>
          </div>
          <div className="bg-white rounded p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-700 text-center">
              {decryptedValue.value}
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              Decrypted at {new Date(decryptedValue.decryptedAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="font-medium text-blue-900 mb-1">About Decryption:</p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-blue-800">
          <li>Requires proper authorization from smart contract</li>
          <li>Can be user-specific or public depending on contract logic</li>
          <li>Original value remains encrypted on-chain</li>
        </ul>
      </div>
    </div>
  );
}
