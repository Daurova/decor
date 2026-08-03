// web/app/products/[slug]/components/TryInInterior.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface TryInInteriorProps {
  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
  onClose: () => void;
}

export function TryInInterior({ product, onClose }: TryInInteriorProps) {
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRoomImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // сбрасываем предыдущий результат
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setRoomImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleGenerate = async () => {
    if (!roomImage) return;
    
    setLoading(true);
    setResult(null);

    try {
      // TODO: заменить на реальный API
      // const formData = new FormData();
      // formData.append('roomImage', roomImage);
      // formData.append('panelImage', product.imageUrl);
      // formData.append('prompt', prompt);
      // const res = await fetch('/api/generate-interior', { method: 'POST', body: formData });
      // const data = await res.json();
      // setResult(data.imageUrl);
      
      // Имитация генерации
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult('/placeholder.png'); // временно
    } catch (error) {
      console.error('Ошибка генерации:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoomImage(null);
    setPreviewUrl(null);
    setPrompt('');
    setResult(null);
  };

  return (
    <div className="bg-surface/50 rounded-xl border border-border/20 p-4 space-y-4">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h3 className="font-heading font-semibold text-secondary">Примерка в интерьере</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-secondary/40 hover:text-secondary transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Выбранная панель */}
      <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>
        <span className="text-sm text-secondary/80">{product.name}</span>
      </div>

      {/* Загрузка фото комнаты */}
      <div>
        <label className="block text-sm font-medium text-secondary/80 mb-1.5">
          Фото комнаты <span className="text-red-400">*</span>
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`
            border-2 border-dashed rounded-xl p-4 text-center transition-colors
            ${previewUrl ? 'border-primary/50' : 'border-border/30 hover:border-primary/50'}
            ${loading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {previewUrl ? (
            <div className="relative aspect-[4/3] max-h-48 mx-auto rounded-lg overflow-hidden">
              <Image src={previewUrl} alt="Комната" fill className="object-cover" />
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                disabled={loading}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="roomImage"
                disabled={loading}
              />
              <label htmlFor="roomImage" className="cursor-pointer text-secondary/60 hover:text-secondary transition-colors block">
                <div className="text-3xl mb-1">📤</div>
                <p className="text-sm">Нажмите или перетащите фото</p>
                <p className="text-xs mt-1 text-secondary/40">JPG, PNG, WebP до 10 МБ</p>
              </label>
            </>
          )}
        </div>
      </div>

      {/* Промпт */}
      <div>
        <label className="block text-sm font-medium text-secondary/80 mb-1.5">
          Опишите стиль <span className="text-secondary/40 text-xs">(опционально)</span>
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Например: светлая комната, минимализм, дневной свет"
          className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-secondary placeholder:text-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          disabled={loading}
        />
      </div>

      {/* Кнопки */}
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={!roomImage || loading}
          className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin" /> Генерация...
            </>
          ) : (
            <>🎨 Сгенерировать</>
          )}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-muted text-secondary/60 rounded-lg hover:bg-muted/80 transition-colors text-sm disabled:opacity-50"
          disabled={loading}
        >
          Сбросить
        </button>
      </div>

      {/* Результат */}
      {result && (
        <div className="mt-2 pt-3 border-t border-border/20">
          <h4 className="text-sm font-medium text-secondary/60 mb-2">Результат:</h4>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            <Image src={result} alt="Результат генерации" fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}