'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const menCategories = [
  {
    id: 1,
    title: "Shoes",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    description: "Step into style with our complete collection",
    itemCount: "200+ styles",
    bgGradient: "from-gray-900 via-gray-800 to-black"
  },
  {
    id: 2,
    title: "Clothing",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    description: "Performance meets style in every piece",
    itemCount: "150+ items",
    bgGradient: "from-blue-900 via-blue-800 to-indigo-900"
  },
  {
    id: 3,
    title: "Accessories",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7e2b4d4a-8c7d-4c4d-9e2b-8c7d4c4d9e2b/nike-heritage-backpack.png",
    description: "Complete your look with premium accessories",
    itemCount: "75+ pieces",
    bgGradient: "from-green-900 via-emerald-800 to-teal-900"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High OG",
    category: "Basketball",
    price: "$170",
    originalPrice: "$170",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b1bcbca4-e853-4df7-b329-5be3c61ee057/air-jordan-1-retro-high-og-shoes.png",
    badge: "Best Seller",
    isNew: true
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    category: "Lifestyle",
    price: "$150",
    originalPrice: "$180",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ahfskusjdvqahcx7rjlj/air-max-270-shoes.png",
    badge: "Sale",
    isNew: false
  },
  {
    id: 3,
    name: "Nike Dri-FIT Training Tee",
    category: "Training",
    price: "$35",
    originalPrice: "$35",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    badge: "Popular",
    isNew: false
  },
  {
    id: 4,
    name: "Air Force 1 '07",
    category: "Lifestyle",
    price: "$110",
    originalPrice: "$110",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    badge: "Classic",
    isNew: false
  },
  {
    id: 5,
    name: "Nike Tech Fleece Hoodie",
    category: "Lifestyle",
    price: "$90",
    originalPrice: "$110",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    badge: "Sale",
    isNew: false
  },
  {
    id: 6,
    name: "Air Jordan 4 Retro",
    category: "Basketball",
    price: "$210",
    originalPrice: "$210",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0452b964-e9ad-4f13-8bea-48aea1d32098/air-jordan-4-retro-shoes.png",
    badge: "Limited",
    isNew: true
  }
];

const sportsCategories = [
  {
    name: "Basketball",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/61aa5e6c-45d3-4ece-b0b7-206949bcad17/M+J+BRND+BR+SNKR+PCH+SS+CRW.png",
    count: "50+ items"
  },
  {
    name: "Running",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0ed7d67a-3cd8-476b-92c0-f233cfd24bd5/NIKE+VOMERO+18.png",
    count: "75+ items"
  },
  {
    name: "Training",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    count: "60+ items"
  },
  {
    name: "Lifestyle",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    count: "100+ items"
  }
];

export default function MenPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filteredProducts = selectedFilter === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category.toLowerCase() === selectedFilter);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            MEN'S
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover performance, style, and innovation designed for the modern man. From court to street, we've got you covered.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg text-lg">
            Shop All Men's
          </button>
        </div>

        {/* Main Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menCategories.map((category) => (
              <div key={category.id} className="relative group cursor-pointer overflow-hidden rounded-3xl">
                <div className="aspect-[4/5] relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-90`}></div>
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-white">
                    <h3 className="text-3xl font-black mb-2 tracking-wide">{category.title}</h3>
                    <p className="text-lg mb-2 opacity-90">{category.description}</p>
                    <p className="text-sm mb-4 opacity-75">{category.itemCount}</p>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                      Shop {category.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Sport</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sportsCategories.map((sport, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl p-6 hover:bg-gray-200 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{sport.name}</h3>
                  <p className="text-sm text-gray-600">{sport.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-2 shadow-lg">
              {['all', 'basketball', 'lifestyle', 'training'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 capitalize ${
                    selectedFilter === filter
                      ? 'bg-black text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {filter === 'all' ? 'All Products' : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => (
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
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mb-16">
          <button className="bg-gray-100 text-black px-16 py-5 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-lg border-2 border-gray-200 hover:border-gray-300">
            Load More Products
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Stay in the Game</h3>
          <p className="text-xl mb-8 opacity-90">Get the latest drops, exclusive access, and member benefits.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-black font-medium"
            />
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
