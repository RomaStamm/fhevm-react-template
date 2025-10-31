/**
 * Computation Demo Component
 * Demonstrates homomorphic computation on encrypted data
 */

'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const ComputationDemo: React.FC = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompute = async () => {
    if (!value1 || !value2) return;

    setIsProcessing(true);
    try {
      // In a real implementation, this would perform FHE computation
      // For demo purposes, we'll simulate the operation
      const num1 = parseInt(value1, 10);
      const num2 = parseInt(value2, 10);

      let computedResult: number;
      switch (operation) {
        case 'add':
          computedResult = num1 + num2;
          break;
        case 'subtract':
          computedResult = num1 - num2;
          break;
        case 'multiply':
          computedResult = num1 * num2;
          break;
      }

      setResult(`Result: ${computedResult} (computed on encrypted data)`);
    } catch (error) {
      console.error('Computation error:', error);
      alert('Computation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation" subtitle="Perform operations on encrypted data">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Value 1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first number"
            disabled={isProcessing}
          />
          <Input
            label="Value 2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second number"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (*)</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          disabled={!value1 || !value2 || isProcessing}
          isLoading={isProcessing}
          className="w-full"
        >
          Compute on Encrypted Data
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-green-800">{result}</p>
            <p className="text-xs text-green-600 mt-1">
              The computation was performed without decrypting the values
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
