// components/CaptureResult.tsx
import React from 'react';

interface CaptureResultProps {
  capturedImage: string;
}

export const CaptureResult: React.FC<CaptureResultProps> = ({ capturedImage }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        📸 Hasil Jepretan Manual
      </h2>
      
      <div className="flex items-center justify-center h-full min-h-48">
        {capturedImage ? (
          <div className="text-center">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full max-w-64 h-auto rounded-lg border mb-3"
            />
            <p className="text-sm text-gray-600">Gambar yang dikirim ke API</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-5xl mb-3">📷</div>
            <p className="text-sm">Klik "Cek Manual" untuk mengambil gambar</p>
          </div>
        )}
      </div>
    </div>
  );
};