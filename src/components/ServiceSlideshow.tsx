
import React, { useState, useEffect } from 'react';

interface ServiceSlideshowProps {
  images: string[];
  interval?: number;
}

const ServiceSlideshow: React.FC<ServiceSlideshowProps> = ({ 
  images, 
  interval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isPaused]);

  if (images.length === 0) {
    return (
      <div className="slideshow-container h-[200px]">
        <div className="h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">Sem imagens disponíveis</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="slideshow-container h-[200px] border-2 border-brandPurple rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide h-full w-full bg-cover bg-center ${
            index === currentIndex ? 'active' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};

export default ServiceSlideshow;
