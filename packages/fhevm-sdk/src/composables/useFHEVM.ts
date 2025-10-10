import { ref, readonly, onMounted, inject, provide, type InjectionKey, type Ref } from 'vue';
import { FHEVMClient } from '../core/client';
import type { FHEVMConfig } from '../types';

export interface FHEVMContext {
  client: FHEVMClient;
  isInitialized: Readonly<Ref<boolean>>;
  isInitializing: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;
}

const FHEVMSymbol: InjectionKey<FHEVMContext> = Symbol('fhevm');

/**
 * Provides FHEVM client to child components
 * Use this in your root component or plugin
 */
export function provideFHEVM(config: FHEVMConfig): FHEVMContext {
  const client = new FHEVMClient(config);
  const isInitialized = ref(false);
  const isInitializing = ref(false);
  const error = ref<string | null>(null);

  onMounted(async () => {
    isInitializing.value = true;
    error.value = null;

    try {
      await client.init();
      isInitialized.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to initialize FHEVM';
      console.error('FHEVM initialization failed:', err);
    } finally {
      isInitializing.value = false;
    }
  });

  const context: FHEVMContext = {
    client,
    isInitialized: readonly(isInitialized),
    isInitializing: readonly(isInitializing),
    error: readonly(error),
  };

  provide(FHEVMSymbol, context);

  return context;
}

/**
 * Injects FHEVM client from parent component
 * Use this in child components to access FHEVM functionality
 *
 * @example
 * ```vue
 * <script setup>
 * import { useFHEVM } from '@fhevm/sdk/vue';
 *
 * const { client, isInitialized, error } = useFHEVM();
 * </script>
 * ```
 */
export function useFHEVM(): FHEVMContext {
  const context = inject(FHEVMSymbol);

  if (!context) {
    throw new Error(
      'useFHEVM must be used within a component that has called provideFHEVM. ' +
      'Make sure you have set up the FHEVM provider in your root component or plugin.'
    );
  }

  return context;
}
