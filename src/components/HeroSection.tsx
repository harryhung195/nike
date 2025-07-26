'use client';

import { useState, useEffect } from 'react';

// Custom Arrow Icons
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const slides = [
  {
    id: 1,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/579f358c-27a4-42eb-8990-f114ebb204ce/NIKE+GATO.png",
    category: "Nike Dunk Collection",
    title: "CUSTOM NIKE DUNK",
    subtitle: "Design your own style",
    description: "Create something unique with our customization platform.",
    buttonText: "Customize Now",
    bgColor: "from-purple-900 to-indigo-900"
  },
  {
    id: 2,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/690c8469-5d8a-4e27-915e-e34b2c48a747/TOTAL+90.png",
    category: "Air Force 1",
    title: "AIR FORCE 1",
    subtitle: "Since 1982",
    description: "The radiance lives on in the Air Force 1.",
    buttonText: "Shop AF1",
    bgColor: "from-gray-900 to-black"
  },
  {
    id: 3,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2d788dcc-5eef-4969-b955-c59c04170a89/W+NIKE+STRUCTURE+26.png",
    category: "Jordan Collection",
    title: "AIR JORDAN 1",
    subtitle: "Retro High OG",
    description: "The original. The icon. The Air Jordan 1.",
    buttonText: "Shop Jordan",
    bgColor: "from-red-900 to-black"
  },
  {
    id: 4,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5c48e7de-23c5-4016-ae21-facb3e25f86e/AIR+JORDAN+40.png",
    category: "Air Max Collection",
    title: "AIR MAX 90",
    subtitle: "Nothing as comfortable",
    description: "The pinnacle of Air Max technology and style.",
    buttonText: "Shop Air Max",
    bgColor: "from-blue-900 to-black"
  },
  {
    id: 5,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0452b964-e9ad-4f13-8bea-48aea1d32098/air-jordan-4-retro-shoes.png",
    category: "Jordan Retro",
    title: "AIR JORDAN 4",
    subtitle: "Bred Reimagined",
    description: "The legend continues with premium craftsmanship.",
    buttonText: "Shop Retro",
    bgColor: "from-slate-900 to-red-900"
  },
  {
    id: 6,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4c07bec7-d921-46b9-a2ee-dfaeffab273e/NIKE+SB+DUNK+LOW+PRO.png",
    category: "Nike Blazer",
    title: "BLAZER MID '77",
    subtitle: "Vintage Basketball",
    description: "Classic basketball style with vintage appeal.",
    buttonText: "Shop Blazer",
    bgColor: "from-orange-900 to-yellow-800"
  },
  {
    id: 7,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9815cf0598ac/react-element-55-shoes.png",
    category: "Nike React",
    title: "REACT ELEMENT 55",
    subtitle: "Hybrid Performance",
    description: "Innovative React foam meets modern street style.",
    buttonText: "Shop React",
    bgColor: "from-green-900 to-teal-800"
  },
  {
    id: 8,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    category: "Basketball Elite",
    title: "ZOOM FREAK 4",
    subtitle: "Greek Freak",
    description: "Giannis' signature shoe for explosive performance.",
    buttonText: "Shop Basketball",
    bgColor: "from-emerald-900 to-blue-900"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative h-[700px] bg-gradient-to-br from-gray-900 to-black overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 transform -translate-x-full' 
                  : 'opacity-0 transform translate-x-full'
            }`}
          >
            {/* Background with gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor || 'from-gray-900 to-black'} opacity-90 z-10`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-20" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </div>

            {/* Product Image */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full flex items-center justify-center z-5">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-[80%] object-contain drop-shadow-2xl filter hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-16 max-w-2xl">
              <div className="transform transition-all duration-1000 delay-300">
                <p className="text-sm md:text-base font-medium mb-4 tracking-widest text-orange-400 uppercase">
                  {slide.category}
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white leading-none">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-light mb-4 text-gray-300">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-8 max-w-md text-gray-400 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                    {slide.buttonText}
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators with Thumbnails */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative group transition-all duration-300 ${
              index === currentSlide ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentSlide
                ? 'border-white shadow-lg'
                : 'border-white/40 hover:border-white/60'
            }`}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                index === currentSlide ? 'opacity-0' : 'opacity-40 group-hover:opacity-20'
              }`} />
            </div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-orange-400 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-30 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full">
        <span className="text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
