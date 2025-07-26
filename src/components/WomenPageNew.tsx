'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const womenCategories = [
  {
    id: 1,
    title: "Shoes",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/18f4b5eb-24a5-4e2b-8863-d6cf4e1b8e15/air-jordan-1-low-og-shoes.png",
    description: "Step into your power with our collection",
    count: "200+"
  },
  {
    id: 2,
    title: "Clothing",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    description: "Activewear that moves with you",
    count: "150+"
  },
  {
    id: 3,
    title: "Accessories",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    description: "Complete your look",
    count: "80+"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Low OG Women's",
    category: "Basketball",
    price: "$140",
    originalPrice: "$140",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/18f4b5eb-24a5-4e2b-8863-d6cf4e1b8e15/air-jordan-1-low-og-shoes.png",
    badge: "Best Seller",
    isNew: true
  },
  {
    id: 2,
    name: "Nike Air Max DN",
    category: "Lifestyle",
    price: "$120",
    originalPrice: "$150",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Sale",
    isNew: false
  },
  {
    id: 3,
    name: "Nike Dri-FIT Women's Training Top",
    category: "Training",
    price: "$45",
    originalPrice: "$45",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    badge: "Popular",
    isNew: false
  },
  {
    id: 4,
    name: "Nike Air Force 1 '07 Women's",
    category: "Lifestyle",
    price: "$110",
    originalPrice: "$110",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    badge: "Comfort",
    isNew: false
  },
  {
    id: 5,
    name: "Nike Women's Running Shorts",
    category: "Running",
    price: "$35",
    originalPrice: "$45",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    badge: "Sale",
    isNew: true
  },
  {
    id: 6,
    name: "Nike Women's Yoga Set",
    category: "Training",
    price: "$85",
    originalPrice: "$95",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Sport",
    isNew: false
  }
];

export default function WomenPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = selectedFilter === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category.toLowerCase() === selectedFilter);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Women's 
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"> Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover performance and style designed for the modern woman. From training to lifestyle, 
            find your perfect fit and unleash your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
              Shop Women's
            </button>
            <button className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all duration-300">
              View Collections
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {womenCategories.map((category) => (
              <div 
                key={category.id} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 p-8 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <p className="text-pink-600 font-semibold mb-4">{category.count} items</p>
                  <button className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-900 px-6 py-3 rounded-full font-medium hover:from-pink-200 hover:to-purple-200 transition-all duration-300 hover:scale-105">
                    Explore {category.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="flex justify-center mb-8">
            <div className="bg-pink-100 rounded-full p-2 shadow-lg">
              {['all', 'basketball', 'lifestyle', 'training', 'running'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 capitalize ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
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
          <button className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-900 px-16 py-5 rounded-full font-bold hover:from-pink-200 hover:to-purple-200 transition-all duration-300 hover:scale-105 text-lg border-2 border-pink-200 hover:border-pink-300">
            Load More Products
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Join the Movement</h3>
          <p className="text-xl mb-8 opacity-90">Be the first to know about new drops, exclusive offers, and inspiring stories.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
