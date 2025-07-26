"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendingSection() {
  const products = [
    {
      name: "Nike Air Superfly",
      category: "Women's Shoes",
      price: "$150",
      image: "https://ext.same-assets.com/4169129157/2742510918.jpeg"
    },
    {
      name: "Nike Total 90",
      category: "Men's Shoes",
      price: "$150",
      image: "https://ext.same-assets.com/4169129157/734372854.jpeg"
    },
    {
      name: "Nike Pegasus Premium",
      category: "Men's Road Running Shoes",
      price: "$300",
      image: "https://ext.same-assets.com/4169129157/771826120.jpeg"
    },
    {
      name: "Nike",
      category: "Men's",
      price: "$300",
      image: "https://ext.same-assets.com/4169129157/1367638753.jpeg"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Trending This Week</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">View All</span>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-medium text-black mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
