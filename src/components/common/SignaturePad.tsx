import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, Check, PenTool } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signatureDataUrl: string) => void;
  onClear?: () => void;
  height?: number;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ 
  onSave, 
  onClear,
  height = 160 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [height]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in event && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in event) {
      return {
        x: (event as MouseEvent).clientX - rect.left,
        y: (event as MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL('image/png'));
    }
  }, [isDrawing, onSave]);

  useEffect(() => {
    const handleUp = () => stopDrawing();
    const handleMove = (e: MouseEvent | TouchEvent) => draw(e);

    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    window.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });

    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [draw, stopDrawing]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    onClear?.();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label 
          htmlFor="signature-canvas" 
          className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
        >
          <PenTool className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span>Consignee Digital Signature</span>
          <span className="text-rose-500 font-bold" aria-hidden="true">*</span>
        </label>
        {hasContent && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            Signature Captured
          </span>
        )}
      </div>

      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 overflow-hidden shadow-inner">
        <canvas
          id="signature-canvas"
          ref={canvasRef}
          role="img"
          aria-label="Digital signature touch pad. Draw your signature using finger or mouse."
          style={{ height: `${height}px`, width: '100%', touchAction: 'none' }}
          onMouseDown={startDrawing}
          onTouchStart={startDrawing}
          className="cursor-crosshair w-full block"
        />

        {!hasContent && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 select-none">
            <p className="text-sm">Sign inside this box (Touch or Mouse)</p>
            <span className="text-xs text-slate-500 mt-1">Proof of Delivery verification</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-1">
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasContent}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
          Clear Signature
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Timestamped with device geolocation
        </span>
      </div>
    </div>
  );
};
