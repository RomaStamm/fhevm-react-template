'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import EncryptForm from '@/components/EncryptForm';
import DecryptDisplay from '@/components/DecryptDisplay';

export default function Home() {
  const [encryptedValue, setEncryptedValue] = useState<any>(null);
  const { isInitialized } = useEncrypt();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FHEVM SDK Example
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Next.js 14 Application with Fully Homomorphic Encryption
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm text-gray-500">
              {isInitialized ? 'SDK Initialized' : 'Initializing SDK...'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Encryption Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Encrypt Data
            </h2>
            <p className="text-gray-600 mb-6">
              Enter a number to encrypt it using Fully Homomorphic Encryption.
              The encrypted value can be used in smart contracts without revealing the plaintext.
            </p>
            <EncryptForm onEncrypted={setEncryptedValue} />
          </div>

          {/* Decryption Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Decrypt Data
            </h2>
            <p className="text-gray-600 mb-6">
              View the encrypted data and decrypt it if you have the proper permissions.
            </p>
            <DecryptDisplay encryptedValue={encryptedValue} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">FHE Encryption</h3>
              <p className="text-sm text-gray-600">
                Encrypt data that can be computed on without decryption
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy Integration</h3>
              <p className="text-sm text-gray-600">
                Simple hooks API with less than 10 lines of code
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Type Safe</h3>
              <p className="text-sm text-gray-600">
                Full TypeScript support with complete type definitions
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Learn more about the FHEVM SDK and how to build confidential dApps
          </p>
          <a
            href="https://docs.zama.ai/fhevm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View Documentation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
