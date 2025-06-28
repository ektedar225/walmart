import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const Header: React.FC = () => {
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
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-walmart-yellow transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;