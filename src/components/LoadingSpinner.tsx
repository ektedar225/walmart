import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-12 h-12 text-walmart-blue animate-spin mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Needs...</h3>
      <p className="text-gray-600 text-center max-w-md">
        Our AI is comparing hundreds of products to find the perfect match for your health goals.
      </p>
    </div>
  );
};

export default LoadingSpinner;