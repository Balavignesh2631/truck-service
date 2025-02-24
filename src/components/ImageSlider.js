import React, { useState, useEffect, useRef } from 'react';


const ImageSlider = ({ images, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [images, interval]);

  return (


    <div className='relative w-full max-w-4xl mx-auto overflow-hidden'>
      <button 
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none'
        onClick={prevSlide}
      >
        &#10094;
      </button> 
      <div className='w-full h-64 md:h-96 flex items-center justify-center'>
        <img 
          src={images[currentSlide]} 
          alt={`Slide ${currentSlide + 1}`} 
          className='w-full h-full object-cover'
        />        
      </div>
      <button
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none'
        onClick={nextSlide}
      >
        &#10095;
      </button>

    </div>
  );
};

export default ImageSlider;
