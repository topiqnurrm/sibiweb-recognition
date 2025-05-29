// components/CameraSection.tsx
import React from 'react';
import { DetectionOverlay } from './DetectionOverlay';

interface CameraSectionProps {
  videoRef: React.RefObject<HTMLVideoElement | null>; // ← Tambahkan | null
  isStreaming: boolean;
  isAutoDetecting: boolean;
  isLoading: boolean;
  error: string;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onStartAutoDetection: () => void;
  onStopAutoDetection: () => void;
  onManualCapture: () => void;
  onDrawOverlay: () => void;
}

export const CameraSection: React.FC<CameraSectionProps> = ({
  videoRef,
  isStreaming,
  isAutoDetecting,
  isLoading,
  error,
  onStartCamera,
  onStopCamera,
  onStartAutoDetection,
  onStopAutoDetection,
  onManualCapture,
  onDrawOverlay
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">🎥 Kamera Live</h2>
      
      <div className="relative mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 bg-gray-200 rounded-lg object-cover"
          onLoadedMetadata={onDrawOverlay}
        />
        
        <DetectionOverlay 
          videoRef={videoRef}
          isAutoDetecting={isAutoDetecting}
          isStreaming={isStreaming}
        />
        
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-500 text-sm">Kamera Off</p>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="space-y-2">
        {!isStreaming ? (
          <button
            onClick={onStartCamera}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🎥 Mulai Kamera
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {!isAutoDetecting ? (
              <>
                <button
                  onClick={onStartAutoDetection}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  ▶️ Auto Deteksi
                </button>
                <button
                  onClick={onManualCapture}
                  disabled={isLoading}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                >
                  {isLoading ? '⏳' : '📸'} Cek Manual
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onStopAutoDetection}
                  className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  ⏸️ Stop Auto
                </button>
                <button
                  onClick={onManualCapture}
                  disabled={isLoading}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                >
                  {isLoading ? '⏳' : '📸'} Cek Manual
                </button>
              </>
            )}
          </div>
        )}
        {isStreaming && (
          <button
            onClick={onStopCamera}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            ⏹️ Hentikan Kamera
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};