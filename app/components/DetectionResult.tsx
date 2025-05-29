// components/DetectionResult.tsx
import React from 'react';
import { PredictionResult } from '../types/prediction';

interface DetectionResultProps {
  prediction: PredictionResult | null;
  predictionHistory: string[];
  isAutoDetecting: boolean;
}

export const DetectionResult: React.FC<DetectionResultProps> = ({
  prediction,
  predictionHistory,
  isAutoDetecting
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        🔍 Hasil Deteksi 
        {isAutoDetecting && <span className="text-green-500 text-sm ml-1">(Live)</span>}
      </h2>
      
      {/* Current Prediction */}
      <div className="mb-6">
        {prediction ? (
          <div className="text-center">
            <div className="mb-4">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {prediction.prediction}
              </div>
              <p className="text-gray-600 text-sm">Huruf Terdeteksi</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Confidence:</p>
              <div className="text-2xl font-semibold text-green-600 mb-2">
                {(parseFloat(prediction.confidence) * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${parseFloat(prediction.confidence) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">🤚</div>
            <p className="text-sm">Belum ada hasil deteksi</p>
          </div>
        )}
      </div>

      {/* History */}
      <div className="flex-1">
        {predictionHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📝 Riwayat Deteksi:</h3>
            <div className="grid grid-cols-4 gap-2">
              {predictionHistory.map((letter, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded text-sm font-medium text-center ${
                    index === 0 
                      ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 font-medium mb-2">ℹ️ Informasi:</p>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• Mendukung huruf A-Y (tanpa J & Z)</li>
          <li>• Auto: deteksi otomatis setiap 1 detik</li>
          <li>• Manual: ambil gambar satu kali untuk analisis</li>
          <li>• Pastikan pencahayaan cukup dan tangan dalam frame</li>
        </ul>
      </div>
    </div>
  );
};