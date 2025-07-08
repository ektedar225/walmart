import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  return (
    <header className="bg-walmart-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-walmart-yellow rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-walmart-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Smart Health Recommendations</h1>
              <p className="text-sm text-blue-100">Powered by Walmart</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="relative flex items-center justify-center bg-white rounded-full p-2 hover:bg-walmart-blue-light transition-colors"
              onClick={onCartClick}
              aria-label="View Cart"
            >
              <ShoppingCart className="w-6 h-6 text-walmart-blue" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;