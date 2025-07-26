'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  isNew?: boolean;
  sizes?: string[];
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  badge,
  isNew,
  sizes
}: ProductCardProps) {
  const { addItem, toggleCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizes, setShowSizes] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Get appropriate sizes based on category
  const getDefaultSizes = () => {
    const cat = category.toLowerCase();
    if (cat.includes('shoes') || cat.includes('sneaker') || cat.includes('basketball') || cat.includes('running')) {
      return ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];
    } else if (cat.includes('kids')) {
      return ['2C', '3C', '4C', '5C', '6C', '7C', '1Y', '2Y', '3Y'];
    } else {
      // Clothing sizes
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
  };

  const productSizes = sizes || getDefaultSizes();

  const handleAddToCart = () => {
    // Always require size selection for all products
    if (!selectedSize) {
      setShowSizes(true);
      return;
    }

    addItem({
      id,
      name,
      category,
      price,
      image,
      size: selectedSize,
    });

    // Open cart after adding item
    toggleCart();
    
    // Reset selections
    setSelectedSize('');
    setShowSizes(false);
  };

  const isOnSale = originalPrice && originalPrice !== price;

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {badge && (
            <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded">
              {badge}
            </span>
          )}
          {isOnSale && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>

        {/* Quick Actions */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          {showSizes ? (
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <p className="text-xs font-medium mb-2 text-gray-700">Select Size:</p>
              <div className="grid grid-cols-3 gap-1">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs py-1 px-2 rounded border transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 bg-black text-white text-xs py-2 px-3 rounded font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowSizes(false)}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-2 px-4 rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="w-full bg-white text-black py-2 px-4 rounded font-medium border border-gray-300 hover:border-black transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">{name}</h3>
        
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{price}</span>
          {isOnSale && originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{category}</p>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{name}</h1>
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="text-2xl font-bold text-gray-900">{price}</span>
                      {isOnSale && originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experience premium comfort and style with this carefully crafted {name.toLowerCase()}. 
                      Designed for both performance and everyday wear, featuring innovative materials and 
                      contemporary design elements that make it perfect for any occasion.
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Features</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Premium materials and construction
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Comfortable and durable design
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Versatile style for any occasion
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Available in multiple sizes
                      </li>
                    </ul>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {productSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 rounded border text-center transition-colors ${
                            selectedSize === size
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedSize}
                      className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                    {!selectedSize && (
                      <p className="text-sm text-gray-500 text-center">Please select a size</p>
                    )}
                  </div>

                  {/* Reviews Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {/* Review 1 */}
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(5)}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">5.0</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Amazing quality!</p>
                        <p className="text-sm text-gray-600">
                          "Love the comfort and style of this product. Perfect fit and great quality materials. 
                          Would definitely recommend to others!"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">- Sarah M. | Verified Purchase</p>
                      </div>

                      {/* Review 2 */}
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(4)}{'☆'}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">4.0</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Great value</p>
                        <p className="text-sm text-gray-600">
                          "Really happy with this purchase. The design is exactly what I was looking for. 
                          Sizing was accurate and delivery was fast."
                        </p>
                        <p className="text-xs text-gray-500 mt-2">- Mike R. | Verified Purchase</p>
                      </div>

                      {/* Review 3 */}
                      <div className="pb-2">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(5)}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">5.0</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Exceeded expectations</p>
                        <p className="text-sm text-gray-600">
                          "The product quality is outstanding. Very comfortable and looks even better in person. 
                          Will definitely be buying more from this brand."
                        </p>
                        <p className="text-xs text-gray-500 mt-2">- Jessica L. | Verified Purchase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
