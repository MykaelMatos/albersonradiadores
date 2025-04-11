
import React from 'react';

interface VideoEmbedProps {
  videoUrl: string;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoUrl, className = '' }) => {
  // Função para converter URLs do YouTube para URLs de incorporação
  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      // Se não for YouTube, retornar a URL original
      return url;
    }
  };

  try {
    const embedUrl = getEmbedUrl(videoUrl);
    
    return (
      <div className={`video-container aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title="Video Player"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    );
  } catch (error) {
    console.error("Erro ao incorporar vídeo:", error);
    return (
      <div className={`flex items-center justify-center bg-gray-200 aspect-video ${className}`}>
        <p className="text-gray-500">Erro ao carregar vídeo: URL inválida</p>
      </div>
    );
  }
};

export default VideoEmbed;
