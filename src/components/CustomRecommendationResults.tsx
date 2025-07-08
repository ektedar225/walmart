import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { Recommendation } from '../types';

interface CustomRecommendationResultsProps {
  recommendations: Recommendation[];
  onRestart: () => void;
}

const CustomRecommendationResults: React.FC<CustomRecommendationResultsProps> = ({ recommendations, onRestart }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-walmart-blue mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">AI-Powered Custom Recommendations</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are your personalized product picks, crafted by our AI based on your unique needs. Each card includes a detailed explanation and nutritional/feature match.
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

export default CustomRecommendationResults;
