// hooks/useAutoDetection.ts
import { useRef, useState, useCallback } from 'react';

export const useAutoDetection = (captureFunction: () => void) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);

  const startAutoDetection = useCallback(() => {
    if (intervalRef.current) return;
    
    setIsAutoDetecting(true);
    captureFunction();
    
    intervalRef.current = setInterval(() => {
      captureFunction();
    }, 1000);
  }, [captureFunction]);

  const stopAutoDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoDetecting(false);
  }, []);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return {
    isAutoDetecting,
    startAutoDetection,
    stopAutoDetection,
    cleanup
  };
};