
import React, { useState, useEffect, useCallback } from 'react';
import { heroBanners } from '../../data/mockData';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroBanners.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      {heroBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-8 md:p-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 animate-slide-in">{banner.title}</h1>
            <p className="text-lg md:text-xl text-white animate-slide-in" style={{ animationDelay: '0.2s' }}>{banner.subtitle}</p>
            <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Shop Now
            </button>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
