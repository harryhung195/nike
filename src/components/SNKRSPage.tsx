'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const snkrsCategories = [
  {
    id: 1,
    title: "Jordan",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b1bcbca4-e853-4df7-b329-5be3c61ee057/air-jordan-1-retro-high-og-shoes.png",
    description: "Iconic basketball heritage",
    count: "50+"
  },
  {
    id: 2,
    title: "Air Max",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ahfskusjdvqahcx7rjlj/air-max-270-shoes.png",
    description: "Visible air cushioning technology",
    count: "40+"
  },
  {
    id: 3,
    title: "Limited Drops",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    description: "Exclusive releases",
    count: "20+"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High OG",
    category: "Jordan",
    price: "$170",
    originalPrice: "$170",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b1bcbca4-e853-4df7-b329-5be3c61ee057/air-jordan-1-retro-high-og-shoes.png",
    badge: "Just Dropped",
    isNew: true
  },
  {
    id: 2,
    name: "Air Max 270",
    category: "Air Max",
    price: "$150",
    originalPrice: "$180",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ahfskusjdvqahcx7rjlj/air-max-270-shoes.png",
    badge: "Limited",
    isNew: false
  },
  {
    id: 3,
    name: "Air Force 1 Special Edition",
    category: "Limited",
    price: "$130",
    originalPrice: "$130",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    badge: "Exclusive",
    isNew: false
  },
  {
    id: 4,
    name: "Jordan Legacy 312",
    category: "Jordan",
    price: "$140",
    originalPrice: "$140",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Retro",
    isNew: false
  },
  {
    id: 5,
    name: "Air Max 97",
    category: "Air Max",
    price: "$160",
    originalPrice: "$180",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    badge: "Sale",
    isNew: true
  },
  {
    id: 6,
    name: "Jordan 4 Retro",
    category: "Jordan",
    price: "$200",
    originalPrice: "$200",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    badge: "Hyped",
    isNew: false
  }
];

export default function SNKRSPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = selectedFilter === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category.toLowerCase() === selectedFilter);

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6">
            SNKRS
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> DROPS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get exclusive access to the latest and greatest sneaker releases. 
            Limited drops, coveted collaborations, and iconic retros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105">
              Shop Latest Drops
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
              Download App
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {snkrsCategories.map((category) => (
              <div 
                key={category.id} 
                className="group relative bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-800"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400 mb-2">{category.description}</p>
                  <p className="text-red-500 font-semibold mb-4">{category.count} items</p>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-all duration-300 hover:scale-105">
                    Explore {category.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8 text-center">Latest Drops</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900 rounded-full p-2 shadow-lg border border-gray-800">
              {['all', 'jordan', 'air max', 'limited'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 capitalize ${
                    selectedFilter === filter
                      ? 'bg-white text-black shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {filter === 'all' ? 'All Drops' : filter}
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
          <button className="bg-gray-900 text-white px-16 py-5 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-lg border-2 border-gray-800 hover:border-gray-700">
            Load More Drops
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Never Miss a Drop</h3>
          <p className="text-xl mb-8 opacity-90">Get notified about upcoming releases, exclusive access, and restock alerts.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
