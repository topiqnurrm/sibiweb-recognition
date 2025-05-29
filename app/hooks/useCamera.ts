// hooks/useCamera.ts
import { useRef, useState, useCallback } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 480 }, 
          height: { ideal: 360 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError('');
      }
    } catch (err) {
      setError('Tidak dapat mengakses kamera. Pastikan browser memiliki izin kamera.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  return {
    videoRef,
    isStreaming,
    error,
    setError,
    startCamera,
    stopCamera
  };
};