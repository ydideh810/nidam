import React from 'react';
import { Download } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
  prompt: string;
}

export function ImagePreview({ url, prompt }: ImagePreviewProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="relative group">
      <img
        src={url}
        alt={prompt}
        className="rounded-lg max-w-full border border-cyber-primary shadow-cyber"
        loading="lazy"
      />
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 p-2 rounded-lg bg-cyber-dark/80 text-cyber-light 
                 hover:bg-cyber-primary transition-colors opacity-0 group-hover:opacity-100
                 border border-cyber-primary"
        title="Download image"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}