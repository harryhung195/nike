'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, X, Menu, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white">
      {/* Top utility bar */}
      <div className="bg-gray-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9">
          <div className="flex items-center">
            <img
              src="data:image/png;base64,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"
              alt="Jordan"
              className="h-4 w-4 mr-4"
            />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-black">Find a Store</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-700 hover:text-black">Help</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-700 hover:text-black">Join Us</a>
            <span className="text-gray-400">|</span>
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-700 hover:text-black flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Hi, {user?.firstName}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signin" className="text-gray-700 hover:text-black">Sign In</Link>
            )}
          </div>
        </div>
      </div>

      {/* Free Member Returns banner */}
      <div className="bg-gray-50 text-center py-2 text-sm">
        <span className="font-medium">Free Member Returns</span>
        <br />
        <span className="text-gray-600">Return whatever you don't love within 30 days. </span>
        <a href="#" className="underline">Learn more.</a>
      </div>

      {/* Main navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Nike logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW5pa2UiPjxwYXRoIGQ9Ik0xMiAxMmM1IDAgOC0zIDgtNVMxNyAyIDEyIDJ6Ii8+PHBhdGggZD0iTTIgMTJoMTBjNSA1IDAgOC04IDh6Ii8+PC9zdmc+"
              alt="Nike"
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation menu */}
          <div className="hidden md:flex items-center space-x-8 ml-12">
            <Link 
              href="/new-featured" 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              New and Featured
            </Link>
            <Link 
              href="/men" 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Men
            </Link>
            <Link 
              href="/women" 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Women
            </Link>
            <Link 
              href="/kids" 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Kids
            </Link>
            <Link 
              href="/snkrs" 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-200"
            >
              SNKRS
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-48 border border-gray-200 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleCart}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/new-featured" 
              className="block py-2 text-black font-medium hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New and Featured
            </Link>
            <Link 
              href="/men" 
              className="block py-2 text-black font-medium hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              href="/women" 
              className="block py-2 text-black font-medium hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              href="/kids" 
              className="block py-2 text-black font-medium hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kids
            </Link>
            <Link 
              href="/snkrs" 
              className="block py-2 text-black font-medium hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SNKRS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
