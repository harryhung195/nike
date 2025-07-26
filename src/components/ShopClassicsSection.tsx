"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopClassicsSection() {
  const classics = [
    {
      name: "Air Jordan 1",
      image: "https://ext.same-assets.com/4169129157/2297865780.jpeg"
    },
    {
      name: "Dunk",
      image: "https://ext.same-assets.com/4169129157/3658755102.jpeg"
    },
    {
      name: "Field General",
      image: "https://ext.same-assets.com/4169129157/330376255.jpeg"
    },
    {
      name: "Air Force 1",
      image: "https://ext.same-assets.com/4169129157/4247686055.jpeg"
    },
    {
      name: "Air Max",
      image: "https://ext.same-assets.com/4169129157/2344902416.jpeg"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Shop The Classics</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {classics.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
