
import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const HeroSlideshow: React.FC<SlideshowProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="slideshow-container h-[400px] md:h-[500px]">
        <div className="h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">Sem imagens disponíveis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slideshow-container h-[400px] md:h-[500px] border-4 border-brandPurple">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide h-full w-full bg-cover bg-center ${
            index === currentIndex ? 'active' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="slideshow-navigation">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
