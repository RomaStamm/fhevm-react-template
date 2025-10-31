<script setup lang="ts">
import { provideFHEVM } from '@fhevm/sdk/vue';
import { computed } from 'vue';

// Initialize FHEVM SDK
const config = {
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '0x',
  network: import.meta.env.VITE_NETWORK || 'sepolia',
  aclAddress: import.meta.env.VITE_ACL_ADDRESS,
};

const { isInitialized, isInitializing, error } = provideFHEVM(config);

const statusColor = computed(() => {
  if (error.value) return 'bg-red-500';
  if (isInitializing.value) return 'bg-yellow-500';
  if (isInitialized.value) return 'bg-green-500';
  return 'bg-gray-500';
});

const statusText = computed(() => {
  if (error.value) return `Error: ${error.value}`;
  if (isInitializing.value) return 'Initializing SDK...';
  if (isInitialized.value) return 'SDK Ready';
  return 'Not initialized';
});
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">FHEVM SDK</h1>
            <p class="text-sm text-gray-600">Vue 3 Example Application</p>
          </div>
          <div class="flex items-center gap-2">
            <div :class="['h-2 w-2 rounded-full', statusColor]"></div>
            <span class="text-sm text-gray-600">{{ statusText }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView v-if="isInitialized" />

      <!-- Loading State -->
      <div v-else-if="isInitializing" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Initializing FHEVM SDK...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-red-900">Failed to Initialize</h3>
            <p class="text-red-700 mt-1">{{ error }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-sm text-gray-500">
          <p>Built with FHEVM SDK | Powered by Zama</p>
          <p class="mt-1">
            <a href="https://docs.zama.ai/fhevm" target="_blank" class="text-blue-600 hover:text-blue-700">
              View Documentation
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
