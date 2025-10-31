/**
 * Key Manager Component
 * Manages FHE public keys and displays key information
 */

'use client';

import { useState, useEffect } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const KeyManager: React.FC = () => {
  const { isInitialized, config } = useFHEVM();
  const [keyInfo, setKeyInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchKeyInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      if (data.success) {
        setKeyInfo(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch key info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchKeyInfo();
    }
  }, [isInitialized]);

  return (
    <Card title="Key Management" subtitle="FHE public key information">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Status</p>
            <p className={`text-sm ${isInitialized ? 'text-green-600' : 'text-yellow-600'}`}>
              {isInitialized ? 'Initialized' : 'Initializing...'}
            </p>
          </div>
          <Button
            onClick={fetchKeyInfo}
            disabled={!isInitialized || isLoading}
            isLoading={isLoading}
            size="sm"
          >
            Refresh
          </Button>
        </div>

        {config && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Configuration</p>
            <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
              <p><span className="font-semibold">Network:</span> {config.network}</p>
              <p><span className="font-semibold">Contract:</span> {config.contractAddress}</p>
            </div>
          </div>
        )}

        {keyInfo && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Public Key Info</p>
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(keyInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
