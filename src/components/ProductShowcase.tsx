'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function ProductShowcase() {
  const { addItem, toggleCart } = useCart();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
  } | null>(null);
  const [selectedSize, setSelectedSize] = useState('');

  const handleShowSizes = (product: {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
  }) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setShowSizeModal(true);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedProduct) return;
    
    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize
    });
    toggleCart();
    setShowSizeModal(false);
    setSelectedSize('');
  };

  const getSizes = (category: string) => {
    if (category.toLowerCase().includes('running')) {
      return ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];
    }
    return ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];
  };

  return (
    <section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Nike Structure 26 */}
        <div className="relative h-[600px] overflow-hidden">
          <img
            src="https://ext.same-assets.com/4169129157/3477252275.jpeg"
            alt="Nike Structure 26"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-12">
            <p className="text-sm font-medium mb-2">Nike Structure 26</p>
            <h3 className="text-3xl font-bold mb-4">Run Supported</h3>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleShowSizes({
                  id: 101,
                  name: "Nike Structure 26",
                  category: "Running",
                  price: "$130",
                  image: "https://ext.same-assets.com/4169129157/3477252275.jpeg"
                })}
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Add to Cart
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Latest In Retro Running */}
        <div className="relative h-[600px] overflow-hidden">
          <img
            src="https://ext.same-assets.com/4169129157/2825666564.jpeg"
            alt="Latest In Retro Running"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-12 left-12">
            <p className="text-sm font-medium mb-2">Latest In</p>
            <h3 className="text-3xl font-bold mb-4">Retro Running</h3>
            <button 
              onClick={() => handleShowSizes({
                id: 102,
                name: "Retro Running Shoes",
                category: "Running",
                price: "$120",
                image: "https://ext.same-assets.com/4169129157/2825666564.jpeg"
              })}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Size Selection Modal */}
      {showSizeModal && selectedProduct && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSizeModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Select Size for {selectedProduct.name}</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {getSizes(selectedProduct.category).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 bg-black text-white py-3 px-4 rounded font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  Add to Cart - {selectedProduct.price}
                </button>
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
