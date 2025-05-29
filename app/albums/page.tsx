"use client"

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface PredictionResult {
  prediction: string;
  confidence: string;
}

const Albums = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [predictionHistory, setPredictionHistory] = useState<string[]>([]);
  const [capturedImage, setCapturedImage] = useState<string>('');

  // Navigate back to home page
  const handleBack = () => {
    router.push('/');
  };

  // Draw detection overlay on canvas
  const drawDetectionOverlay = useCallback(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const video = videoRef.current;
    
    if (!overlayCanvas || !video) return;
    
    const ctx = overlayCanvas.getContext('2d');
    if (!ctx) return;

    overlayCanvas.width = video.clientWidth;
    overlayCanvas.height = video.clientHeight;
    
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    const centerX = overlayCanvas.width / 2;
    const centerY = overlayCanvas.height / 2;
    const frameWidth = 150;
    const frameHeight = 150;
    
    // Detection box
    ctx.strokeStyle = isAutoDetecting ? '#10B981' : '#3B82F6';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.strokeRect(
      centerX - frameWidth/2, 
      centerY - frameHeight/2, 
      frameWidth, 
      frameHeight
    );
    
    // Corner markers
    ctx.setLineDash([]);
    ctx.strokeStyle = isAutoDetecting ? '#10B981' : '#3B82F6';
    ctx.lineWidth = 3;
    const cornerSize = 15;
    
    // Draw corners
    const corners = [
      // Top-left
      [[centerX - frameWidth/2, centerY - frameHeight/2 + cornerSize], [centerX - frameWidth/2, centerY - frameHeight/2], [centerX - frameWidth/2 + cornerSize, centerY - frameHeight/2]],
      // Top-right  
      [[centerX + frameWidth/2 - cornerSize, centerY - frameHeight/2], [centerX + frameWidth/2, centerY - frameHeight/2], [centerX + frameWidth/2, centerY - frameHeight/2 + cornerSize]],
      // Bottom-left
      [[centerX - frameWidth/2, centerY + frameHeight/2 - cornerSize], [centerX - frameWidth/2, centerY + frameHeight/2], [centerX - frameWidth/2 + cornerSize, centerY + frameHeight/2]],
      // Bottom-right
      [[centerX + frameWidth/2 - cornerSize, centerY + frameHeight/2], [centerX + frameWidth/2, centerY + frameHeight/2], [centerX + frameWidth/2, centerY + frameHeight/2 - cornerSize]]
    ];
    
    corners.forEach(corner => {
      ctx.beginPath();
      ctx.moveTo(corner[0][0], corner[0][1]);
      ctx.lineTo(corner[1][0], corner[1][1]);
      ctx.lineTo(corner[2][0], corner[2][1]);
      ctx.stroke();
    });
    
    // Status text
    ctx.fillStyle = isAutoDetecting ? '#10B981' : '#6B7280';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      isAutoDetecting ? 'AUTO DETECTING...' : 'AREA DETEKSI',
      centerX,
      centerY + frameHeight/2 + 20
    );
  }, [isAutoDetecting]);

  // Start camera stream
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

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
    stopAutoDetection();
  };

  // Capture and predict function
  const captureAndPredict = useCallback(async (isManual = false) => {
    if (!videoRef.current || !canvasRef.current || isLoading) return;

    if (isManual) setIsLoading(true);

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // For manual capture, save the image
      if (isManual) {
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
      }

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append('file', blob, 'capture.jpg');

        try {
          const response = await fetch('https://kharisjos-bisindo-capstone.hf.space/predict', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result: PredictionResult = await response.json();
          setPrediction(result);
          
          // Add to history (keep last 8)
          setPredictionHistory(prev => {
            const newHistory = [result.prediction, ...prev].slice(0, 8);
            return newHistory;
          });
          
        } catch (apiError) {
          console.error('API Error:', apiError);
          if (isManual) {
            setError('Gagal melakukan prediksi. Coba lagi.');
          }
        }
      }, 'image/jpeg', 0.8);

    } catch (err) {
      console.error('Capture error:', err);
      if (isManual) {
        setError('Terjadi kesalahan saat mengambil gambar');
      }
    } finally {
      if (isManual) setIsLoading(false);
    }
  }, [isLoading]);

  // Manual capture
  const manualCapture = () => {
    captureAndPredict(true);
  };

  // Start auto detection
  const startAutoDetection = () => {
    if (intervalRef.current) return;
    
    setIsAutoDetecting(true);
    setError('');
    setCapturedImage(''); // Clear manual capture when auto starts
    
    captureAndPredict(false);
    
    intervalRef.current = setInterval(() => {
      captureAndPredict(false);
    }, 1000);
  };

  // Stop auto detection
  const stopAutoDetection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoDetecting(false);
    setIsLoading(false);
  };

  // Update overlay when video is playing
  useEffect(() => {
    if (isStreaming && videoRef.current) {
      const updateOverlay = () => {
        drawDetectionOverlay();
        if (isStreaming) {
          requestAnimationFrame(updateOverlay);
        }
      };
      updateOverlay();
    }
  }, [isStreaming, drawDetectionOverlay]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
            {/* Camera Section - Top Left */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex-1">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">🎥 Kamera Live</h2>
              
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 bg-gray-200 rounded-lg object-cover"
                  onLoadedMetadata={drawDetectionOverlay}
                />
                
                <canvas
                  ref={overlayCanvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
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
                    onClick={startCamera}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    🎥 Mulai Kamera
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {!isAutoDetecting ? (
                      <>
                        <button
                          onClick={startAutoDetection}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          ▶️ Auto Deteksi
                        </button>
                        <button
                          onClick={manualCapture}
                          disabled={isLoading}
                          className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                        >
                          {isLoading ? '⏳' : '📸'} Cek Manual
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={stopAutoDetection}
                          className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          ⏸️ Stop Auto
                        </button>
                        <button
                          onClick={manualCapture}
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
                    onClick={stopCamera}
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

            {/* Manual Capture Result - Bottom Left */}
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
          </div>

          {/* Detection Result - Right Side */}
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
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default Albums;