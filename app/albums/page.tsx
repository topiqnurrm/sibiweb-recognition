// Albums.tsx (Main Component - Refactored)
"use client"

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCamera } from '../hooks/useCamera';
import { usePrediction } from '../hooks/usePrediction';
import { useAutoDetection } from '../hooks/useAutoDetection';
import { CameraSection } from '../components/CameraSection';
import { CaptureResult } from '../components/CaptureResult';
import { DetectionResult } from '../components/DetectionResult';

const Albums = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string>('');

  const { 
    videoRef, 
    isStreaming, 
    error, 
    setError, 
    startCamera, 
    stopCamera 
  } = useCamera();

  const { 
    prediction, 
    predictionHistory, 
    isLoading, 
    submitPrediction 
  } = usePrediction();

  // Capture and predict function
  const captureAndPredict = useCallback(async (isManual = false) => {
    if (!videoRef.current || !canvasRef.current || isLoading) return;

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (isManual) {
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
      }

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await submitPrediction(blob, isManual);
        } catch (error) {
          if (isManual) {
            setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
          }
        }
      }, 'image/jpeg', 0.8);

    } catch (err) {
      console.error('Capture error:', err);
      if (isManual) {
        setError('Terjadi kesalahan saat mengambil gambar');
      }
    }
  }, [videoRef, isLoading, submitPrediction, setError]);

  const { 
    isAutoDetecting, 
    startAutoDetection, 
    stopAutoDetection, 
    cleanup 
  } = useAutoDetection(() => captureAndPredict(false));

  const handleStartAutoDetection = () => {
    setError('');
    setCapturedImage('');
    startAutoDetection();
  };

  const handleManualCapture = () => {
    captureAndPredict(true);
  };

  const handleStopCamera = () => {
    stopCamera();
    stopAutoDetection();
  };

  const handleBack = () => {
    router.push('/');
  };

  const drawDetectionOverlay = () => {
    // This function is now handled by DetectionOverlay component
  };

  useEffect(() => {
    return () => {
      stopCamera();
      cleanup();
    };
  }, [stopCamera, cleanup]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span>←</span>
            <span>Kembali</span>
          </button>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
          Deteksi Bahasa Isyarat Real-time (SIBI)
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <CameraSection
              videoRef={videoRef}
              isStreaming={isStreaming}
              isAutoDetecting={isAutoDetecting}
              isLoading={isLoading}
              error={error}
              onStartCamera={startCamera}
              onStopCamera={handleStopCamera}
              onStartAutoDetection={handleStartAutoDetection}
              onStopAutoDetection={stopAutoDetection}
              onManualCapture={handleManualCapture}
              onDrawOverlay={drawDetectionOverlay}
            />

            <CaptureResult capturedImage={capturedImage} />
          </div>

          {/* Right Column */}
          <DetectionResult
            prediction={prediction}
            predictionHistory={predictionHistory}
            isAutoDetecting={isAutoDetecting}
          />
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default Albums;