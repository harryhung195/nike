export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Acknowledgment text */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm italic text-center max-w-4xl mx-auto leading-relaxed">
          Nike acknowledges the Traditional Custodians of the land where we live, work and play sport
          throughout Australia. We pay our respects to Aboriginal and Torres Strait Islander cultures and
          communities, their ongoing connection to land and water and to Elders past and present.
        </p>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Shoes */}
          <div>
            <h3 className="font-medium mb-4">Shoes</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Black Shoes</a></li>
              <li><a href="#" className="hover:text-white">White Shoes</a></li>
              <li><a href="#" className="hover:text-white">Running Shoes</a></li>
              <li><a href="#" className="hover:text-white">Football Shoes</a></li>
            </ul>
          </div>

          {/* Clothing */}
          <div>
            <h3 className="font-medium mb-4">Clothing</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Tops & T-Shirts</a></li>
              <li><a href="#" className="hover:text-white">Shorts</a></li>
              <li><a href="#" className="hover:text-white">Hoodies & Sweatshirts</a></li>
              <li><a href="#" className="hover:text-white">Pants</a></li>
            </ul>
          </div>

          {/* Kids */}
          <div>
            <h3 className="font-medium mb-4">Kids</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Kids Shoes</a></li>
              <li><a href="#" className="hover:text-white">Kids Basketball</a></li>
              <li><a href="#" className="hover:text-white">Kids Running</a></li>
              <li><a href="#" className="hover:text-white">Kids Football</a></li>
            </ul>
          </div>

          {/* Icons */}
          <div>
            <h3 className="font-medium mb-4">Icons</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Air Force 1</a></li>
              <li><a href="#" className="hover:text-white">Jordan 1</a></li>
              <li><a href="#" className="hover:text-white">Air Max</a></li>
              <li><a href="#" className="hover:text-white">Vomero</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-gray-800">
          {/* Resources */}
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Find a Store</a></li>
              <li><a href="#" className="hover:text-white">Become a Member</a></li>
              <li><a href="#" className="hover:text-white">Feedback</a></li>
              <li><a href="#" className="hover:text-white">Product Advice</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-medium mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Get Help</a></li>
              <li><a href="#" className="hover:text-white">Order Status</a></li>
              <li><a href="#" className="hover:text-white">Shipping and Delivery</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Payment Options</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Reviews</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About Nike</a></li>
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Investors</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
            </ul>
          </div>

          {/* Franchise */}
          <div>
            <h3 className="font-medium mb-4">Franchise</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Air Force 1</a></li>
              <li><a href="#" className="hover:text-white">Air Jordan 1</a></li>
              <li><a href="#" className="hover:text-white">Pegasus</a></li>
            </ul>

            <div className="mt-6 flex items-center text-sm text-gray-300">
              <span className="mr-2">🌏</span>
              <span>Australia</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2025 Nike, Inc. All rights reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Terms of Sale</a>
            <a href="#" className="hover:text-white">Privacy & Cookie Policy</a>
            <a href="#" className="hover:text-white">Privacy Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
