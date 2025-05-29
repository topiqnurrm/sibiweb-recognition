// components/DetectionOverlay.tsx
import React, { useRef, useEffect, useCallback } from 'react';

interface DetectionOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>; // ← Tambahkan | null
  isAutoDetecting: boolean;
  isStreaming: boolean;
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({ 
  videoRef, 
  isAutoDetecting, 
  isStreaming 
}) => {
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

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
      [[centerX - frameWidth/2, centerY - frameHeight/2 + cornerSize], [centerX - frameWidth/2, centerY - frameHeight/2], [centerX - frameWidth/2 + cornerSize, centerY - frameHeight/2]],
      [[centerX + frameWidth/2 - cornerSize, centerY - frameHeight/2], [centerX + frameWidth/2, centerY - frameHeight/2], [centerX + frameWidth/2, centerY - frameHeight/2 + cornerSize]],
      [[centerX - frameWidth/2, centerY + frameHeight/2 - cornerSize], [centerX - frameWidth/2, centerY + frameHeight/2], [centerX - frameWidth/2 + cornerSize, centerY + frameHeight/2]],
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
  }, [isAutoDetecting, videoRef]);

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

  return (
    <canvas
      ref={overlayCanvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
    />
  );
};