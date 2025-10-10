/**
 * React hook for accessing FHEVM context
 */

import { useContext } from 'react';
import { FHEVMContext } from '../react/FHEVMProvider';

export function useFHEVM() {
  const context = useContext(FHEVMContext);

  if (!context) {
    throw new Error('useFHEVM must be used within FHEVMProvider');
  }

  return {
    client: context.client,
    isInitialized: context.status === 'ready',
    isInitializing: context.status === 'initializing',
    error: context.error,
    config: context.config
  };
}
