// hooks/usePrediction.ts
import { useState, useCallback } from 'react';
import { PredictionResult } from '../types/prediction';

export const usePrediction = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitPrediction = useCallback(async (blob: Blob, isManual = false) => {
    if (isManual) setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', blob, 'capture.jpg');

      const response = await fetch('https://kharisjos-capstone-sibi-web.hf.space/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);
      
      setPredictionHistory(prev => {
        const newHistory = [result.prediction, ...prev].slice(0, 8);
        return newHistory;
      });
      
      return result;
    } catch (apiError) {
      console.error('API Error:', apiError);
      if (isManual) {
        throw new Error('Gagal melakukan prediksi. Coba lagi.');
      }
    } finally {
      if (isManual) setIsLoading(false);
    }
  }, []);

  return {
    prediction,
    predictionHistory,
    isLoading,
    submitPrediction
  };
};