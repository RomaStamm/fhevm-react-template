/**
 * Computation Hook
 * Hook for performing homomorphic computations
 */

'use client';

import { useState, useCallback } from 'react';
import { useFHEVM } from '@fhevm/sdk/react';

type ComputationOp = 'add' | 'subtract' | 'multiply';

export function useComputation() {
  const { isInitialized } = useFHEVM();
  const [isComputing, setIsComputing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const compute = useCallback(async (
    operation: ComputationOp,
    operands: any[]
  ) => {
    if (!isInitialized) {
      throw new Error('FHE SDK not initialized');
    }

    setError(null);
    setIsComputing(true);

    try {
      // Call computation API
      const response = await fetch('/api/fhe/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, operands })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Computation failed');
      }

      setResult(data.data.result);
      return data.data.result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Computation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsComputing(false);
    }
  }, [isInitialized]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsComputing(false);
  }, []);

  return {
    compute,
    isComputing,
    result,
    error,
    isInitialized,
    reset
  };
}
