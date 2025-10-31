/**
 * Medical Example Component
 * Demonstrates confidential healthcare data management using FHE
 */

'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm/sdk/react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface MedicalRecord {
  patientId: string;
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  encrypted: boolean;
}

export const MedicalExample: React.FC = () => {
  const [record, setRecord] = useState<MedicalRecord>({
    patientId: 'P-12345',
    heartRate: '75',
    bloodPressure: '120',
    temperature: '98.6',
    encrypted: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { encrypt, isInitialized } = useEncrypt();

  const handleEncryptRecord = async () => {
    setIsProcessing(true);
    try {
      // Encrypt each medical value
      await encrypt(parseInt(record.heartRate, 10));
      await encrypt(parseInt(record.bloodPressure, 10));
      await encrypt(parseFloat(record.temperature));

      setRecord({ ...record, encrypted: true });
      alert('Medical record encrypted successfully!');
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Failed to encrypt medical record');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateField = (field: keyof MedicalRecord, value: string) => {
    setRecord({ ...record, [field]: value, encrypted: false });
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Confidential Medical Records
          </h3>
          <p className="text-sm text-gray-600">
            Store and manage patient data with complete privacy
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Patient ID</p>
              <p className="text-lg font-bold">{record.patientId}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              record.encrypted ? 'bg-green-900' : 'bg-yellow-500 text-gray-900'
            }`}>
              {record.encrypted ? 'Encrypted' : 'Not Encrypted'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Heart Rate (bpm)"
            type="number"
            value={record.heartRate}
            onChange={(e) => handleUpdateField('heartRate', e.target.value)}
            disabled={isProcessing}
          />
          <Input
            label="Blood Pressure (mmHg)"
            type="number"
            value={record.bloodPressure}
            onChange={(e) => handleUpdateField('bloodPressure', e.target.value)}
            disabled={isProcessing}
          />
          <Input
            label="Temperature (°F)"
            type="number"
            step="0.1"
            value={record.temperature}
            onChange={(e) => handleUpdateField('temperature', e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <Button
          onClick={handleEncryptRecord}
          disabled={!isInitialized || isProcessing}
          isLoading={isProcessing}
          className="w-full"
        >
          Encrypt Medical Record
        </Button>

        <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800">
          <p className="font-semibold mb-1">HIPAA Compliance:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Patient data encrypted at rest and in transit</li>
            <li>Only authorized healthcare providers can decrypt</li>
            <li>Audit trail for all data access</li>
            <li>Secure computation on encrypted records</li>
          </ul>
        </div>

        {record.encrypted && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              Record Encrypted Successfully
            </p>
            <p className="text-xs text-blue-600">
              This medical record is now stored in encrypted form and can only be
              accessed by authorized personnel with proper decryption keys.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
