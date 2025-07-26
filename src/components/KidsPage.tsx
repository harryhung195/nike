'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const kidsCategories = [
  {
    id: 1,
    title: "Shoes",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    description: "Fun and comfortable footwear for active kids",
    count: "120+"
  },
  {
    id: 2,
    title: "Clothing",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    description: "Playtime ready apparel",
    count: "90+"
  },
  {
    id: 3,
    title: "Accessories",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    description: "Complete the look",
    count: "40+"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Nike Air Force 1 Kids",
    category: "Basketball",
    price: "$80",
    originalPrice: "$80",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoes.png",
    badge: "Easy On",
    isNew: true
  },
  {
    id: 2,
    name: "Nike Kids Running Shoes",
    category: "Running",
    price: "$65",
    originalPrice: "$80",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ahfskusjdvqahcx7rjlj/air-max-270-shoes.png",
    badge: "Sale",
    isNew: false
  },
  {
    id: 3,
    name: "Nike Kids Training Set",
    category: "Training",
    price: "$45",
    originalPrice: "$45",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/102a854a-ed2b-4181-9e60-20b970590448/U+NSW+TEE+M90+SWOOSH+SPORT.png",
    badge: "Popular",
    isNew: false
  },
  {
    id: 4,
    name: "Nike Kids Playground Shoes",
    category: "Lifestyle",
    price: "$55",
    originalPrice: "$55",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Comfort",
    isNew: false
  },
  {
    id: 5,
    name: "Nike Kids Sport Shorts",
    category: "Training",
    price: "$25",
    originalPrice: "$35",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d0c45da-28dd-412c-9db7-33ec4d9a617e/K+NSW+DF+TRACKSUIT+PK+FZ.png",
    badge: "Sale",
    isNew: true
  },
  {
    id: 6,
    name: "Nike Kids Athletic Hoodie",
    category: "Training",
    price: "$40",
    originalPrice: "$50",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5bb7a45-255b-45e1-bf7d-45ad6653481a/W+AIR+MAX+DN+TECH.png",
    badge: "Popular",
    isNew: false
  }
];

export default function KidsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProducts = selectedFilter === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category.toLowerCase().includes(selectedFilter));

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Kids'
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Let them play, explore, and dream big. Our kids' collection is designed for comfort, 
            durability, and endless adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105">
              Shop Kids'
            </button>
            <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all duration-300">
              Size Guide
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kidsCategories.map((category) => (
              <div 
                key={category.id} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <p className="text-orange-600 font-semibold mb-4">{category.count} items</p>
                  <button className="bg-gradient-to-r from-orange-100 to-red-100 text-gray-900 px-6 py-3 rounded-full font-medium hover:from-orange-200 hover:to-red-200 transition-all duration-300 hover:scale-105">
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
            <div className="bg-orange-100 rounded-full p-2 shadow-lg">
              {['all', 'basketball', 'running', 'training', 'lifestyle'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 capitalize ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
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
              sizes={['2C', '3C', '4C', '5C', '6C', '7C', '1Y', '2Y', '3Y']}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mb-16">
          <button className="bg-gradient-to-r from-orange-100 to-red-100 text-gray-900 px-16 py-5 rounded-full font-bold hover:from-orange-200 hover:to-red-200 transition-all duration-300 hover:scale-105 text-lg border-2 border-orange-200 hover:border-orange-300">
            Load More Products
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Keep Up with the Fun</h3>
          <p className="text-xl mb-8 opacity-90">Get updates on new kids' styles, size guides, and fun activities.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
