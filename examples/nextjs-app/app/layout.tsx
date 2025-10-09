import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FHEVMProvider } from '@fhevm/sdk/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHEVM Next.js Example',
  description: 'Next.js application with FHEVM SDK integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FHEVMProvider
          contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x'}
          network="sepolia"
        >
          {children}
        </FHEVMProvider>
      </body>
    </html>
  );
}
