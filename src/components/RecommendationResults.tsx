import React from 'react';
import { RotateCcw, TrendingUp } from 'lucide-react';
import { Recommendation } from '../types';
import ProductCard from './ProductCard';

interface RecommendationResultsProps {
  recommendations: Recommendation[];
  onRestart: () => void;
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ 
  recommendations, 
  onRestart 
}) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <TrendingUp className="w-8 h-8 text-walmart-blue mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">Your Personalized Recommendations</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your health goals and preferences, we've found {recommendations.length} products 
          that are perfect for you. Each recommendation is scored and explained by our AI.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No suitable products found for your criteria.</p>
          <button
            onClick={onRestart}
            className="bg-walmart-blue text-white px-6 py-3 rounded-lg hover:bg-walmart-blue-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map((rec, index) => (
              <ProductCard
                key={rec.product.id}
                product={rec.product}
                score={rec.score}
                reason={rec.reason}
                nutritionalMatch={rec.nutritionalMatch}
                rank={index + 1}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onRestart}
              className="inline-flex items-center px-6 py-3 border-2 border-walmart-blue text-walmart-blue rounded-lg hover:bg-walmart-blue hover:text-white transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Get New Recommendations
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationResults;