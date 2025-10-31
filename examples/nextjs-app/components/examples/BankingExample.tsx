/**
 * Banking Example Component
 * Demonstrates confidential banking operations using FHE
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const BankingExample: React.FC = () => {
  const [balance, setBalance] = useState<string>('1000');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [encryptedBalance, setEncryptedBalance] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { encrypt, isInitialized } = useEncrypt();

  const handleEncryptBalance = async () => {
    setIsProcessing(true);
    try {
      const numBalance = parseInt(balance, 10);
      const encrypted = await encrypt(numBalance);
      setEncryptedBalance(encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Failed to encrypt balance');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferAmount) return;

    setIsProcessing(true);
    try {
      const amount = parseInt(transferAmount, 10);
      const encrypted = await encrypt(amount);

      // Simulate transfer
      const newBalance = parseInt(balance, 10) - amount;
      setBalance(newBalance.toString());
      setTransferAmount('');

      alert(`Transfer successful! ${amount} units transferred confidentially.`);
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Transfer failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Confidential Banking
          </h3>
          <p className="text-sm text-gray-600">
            Perform private financial transactions with encrypted balances
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg text-white">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-3xl font-bold">{balance} units</p>
          {encryptedBalance && (
            <p className="text-xs opacity-75 mt-2">
              Balance is encrypted on-chain
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleEncryptBalance}
            disabled={!isInitialized || isProcessing}
            isLoading={isProcessing}
            className="w-full"
            variant="primary"
          >
            Encrypt Balance
          </Button>

          <div className="border-t pt-4">
            <Input
              label="Transfer Amount"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount to transfer"
              disabled={!isInitialized || isProcessing}
              helperText="Amount will be encrypted before transfer"
            />
            <Button
              onClick={handleTransfer}
              disabled={!transferAmount || !isInitialized || isProcessing}
              isLoading={isProcessing}
              className="w-full mt-3"
              variant="secondary"
            >
              Make Confidential Transfer
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-1">Privacy Features:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Balance encrypted on-chain</li>
            <li>Transfer amounts hidden from public</li>
            <li>Only authorized parties can view balances</li>
            <li>Full transaction privacy</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
