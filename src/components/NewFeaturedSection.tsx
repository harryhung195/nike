'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import ProductCard from './ProductCard';

const newProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Low OG",
    category: "New Release",
    price: "$140",
    originalPrice: "$140",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Just Dropped",
    isNew: true,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    category: "Basketball",
    price: "$100",
    originalPrice: "$100",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    badge: "Popular",
    isNew: false,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 3,
    name: "Air Force 1 '07 LV8",
    category: "Lifestyle",
    price: "$120",
    originalPrice: "$120",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0ed7d67a-3cd8-476b-92c0-f233cfd24bd5/NIKE+VOMERO+18.png",
    badge: "Limited Edition",
    isNew: true,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 4,
    name: "Air Max 270",
    category: "Running",
    price: "$150",
    originalPrice: "$150",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a35c106c-bbbc-44bc-87a6-4ffb79f6d6e7/W+NSW+STREET+WVN+COACH+JKT.png",
    badge: "Best Seller",
    isNew: false,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  }
];

const featuredProducts = [
  {
    id: 5,
    name: "Air Jordan 11 Retro",
    category: "Jordan",
    price: "$220",
    originalPrice: "$220",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/694060e3-e00d-4610-a04d-9fb94070244d/W+NSW+CLASSIC%2B+WIDE+LEG+SPD.png",
    badge: "Featured",
    isNew: false,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 6,
    name: "Nike Air Max 97",
    category: "Air Max",
    price: "$170",
    originalPrice: "$170",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/19d04c99-12d5-4cb0-afb1-cbf029a15afb/W+NK+DF+UNVRSA+HR+8IN+SHRT+PKT.png",
    badge: "Trending",
    isNew: true,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 7,
    name: "Nike Blazer Mid '77",
    category: "Vintage",
    price: "$100",
    originalPrice: "$100",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    badge: "Classic",
    isNew: false,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  },
  {
    id: 8,
    name: "Air Jordan 4 Retro",
    category: "Jordan",
    price: "$200",
    originalPrice: "$200",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/61aa5e6c-45d3-4ece-b0b7-206949bcad17/M+J+BRND+BR+SNKR+PCH+SS+CRW.png",
    badge: "Heritage",
    isNew: false,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
  }
];

const categories = [
  {
    title: "Women",
    image: "https://static.nike.com/a/images/t_default/61b4738b-e1e1-4786-8f6c-26aa0008e80b/nikecourt-dri-fit-advantage-tennis-dress.png",
    link: "#",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Men",
    image: "https://static.nike.com/a/images/t_default/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes.png",
    link: "#",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    title: "Kids",
    image: "https://static.nike.com/a/images/t_default/25f5a2de-0230-4fa7-bd32-d8443ebfcbd8/force-1-low-easyon-younger-kids-shoes.png",
    link: "#",
    gradient: "from-orange-500 to-yellow-500"
  }
];

export default function NewFeaturedSection() {
  const [activeTab, setActiveTab] = useState<'new' | 'featured'>('new');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('new-featured');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      className={`py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-90 transform translate-y-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            NEW & FEATURED
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the latest drops, trending styles, and our most popular picks from the world's leading athletic brands
          </p>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                </div>
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="text-center w-full">
                    <h4 className="text-3xl font-black text-white mb-4 tracking-wide">{category.title}</h4>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                      Shop {category.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-xl border border-gray-200">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-10 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'new'
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-10 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'featured'
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              Featured
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {(activeTab === 'new' ? newProducts : featuredProducts).map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              badge={product.badge}
              isNew={product.isNew}
              sizes={product.sizes}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-16">
          <button className="bg-black text-white px-16 py-5 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl text-lg">
            View All {activeTab === 'new' ? 'New Arrivals' : 'Featured Products'}
          </button>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-black text-gray-900 mb-3">500+</div>
              <div className="text-gray-600 font-medium">New Releases</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-gray-900 mb-3">1M+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-gray-900 mb-3">24/7</div>
              <div className="text-gray-600 font-medium">Customer Support</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-gray-900 mb-3">FREE</div>
              <div className="text-gray-600 font-medium">Shipping & Returns</div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {isVisible && (
          <div className="text-center mt-12">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
