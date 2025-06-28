import React from 'react';
import { Star, ShoppingCart, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  score?: number;
  reason?: string;
  nutritionalMatch?: string;
  rank?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  score, 
  reason, 
  nutritionalMatch, 
  rank 
}) => {
  const handleAddToCart = () => {
    window.open(product.walmartUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {rank && (
        <div className="bg-walmart-blue text-white px-3 py-1 text-sm font-bold inline-block">
          #{rank} Recommended
        </div>
      )}
      
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {score && (
          <div className="absolute top-2 right-2 bg-walmart-yellow text-walmart-blue px-2 py-1 rounded-full text-sm font-bold">
            {score}/10
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-walmart-blue transition-colors">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-walmart-blue">${product.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-walmart-yellow text-walmart-yellow' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {reason && (
          <div className="bg-walmart-blue-light p-3 rounded-lg mb-4">
            <h4 className="font-semibold text-walmart-blue mb-1">Why this product?</h4>
            <p className="text-sm text-gray-700">{reason}</p>
          </div>
        )}

        {nutritionalMatch && (
          <div className="bg-green-50 p-3 rounded-lg mb-4">
            <h4 className="font-semibold text-green-700 mb-1">Nutritional Benefits</h4>
            <p className="text-sm text-green-600">{nutritionalMatch}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-semibold">{product.nutrition.calories}</div>
            <div className="text-gray-600">Calories</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-semibold">{product.nutrition.protein}g</div>
            <div className="text-gray-600">Protein</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-semibold">{product.nutrition.carbs}g</div>
            <div className="text-gray-600">Carbs</div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-walmart-blue text-white py-3 px-4 rounded-lg hover:bg-walmart-blue-dark transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 border-2 border-walmart-blue text-walmart-blue rounded-lg hover:bg-walmart-blue hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;