import React from 'react';
import { Product } from '../types';

interface CartSummaryProps {
  cart: Product[];
  calorieTarget: number;
  onRemove: (id: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, calorieTarget, onRemove }) => {
  const totalCalories = cart.reduce((sum, p) => sum + (p.nutrition?.calories || 0), 0);
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-walmart-blue mb-4">Cart Calorie Summary</h2>
      <div className="mb-6">
        {cart.length === 0 ? (
          <div className="text-gray-500 text-lg">Your cart is empty.</div>
        ) : (
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map(product => (
              <li key={product.id} className="flex items-center justify-between py-2">
                <div>
                  <span className="font-semibold text-walmart-blue">{product.name}</span>
                  <span className="ml-2 text-gray-500 text-sm">({product.nutrition?.calories || 0} kcal)</span>
                </div>
                <button
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  onClick={() => onRemove(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Total Calories:</span> {totalCalories} kcal
      </div>
      <div className="mb-4">
        <span className="font-semibold">Your Calorie Target:</span> {calorieTarget} kcal
      </div>
      <div>
        {totalCalories > calorieTarget ? (
          <span className="text-red-600 font-semibold">You are over your target!</span>
        ) : (
          <span className="text-green-600 font-semibold">Within your target!</span>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
