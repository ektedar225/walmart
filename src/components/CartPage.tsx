import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface CartPageProps {
  cart: Product[];
  onRemove: (id: string) => void;
  totalCalories: number;
  calorieTarget: number;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemove, totalCalories, calorieTarget }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-walmart-blue mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-lg">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.map(product => (
            <div key={product.id} className="flex items-center justify-between border-b pb-4">
              <ProductCard product={product} />
              <button
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onRemove(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 p-6 bg-gray-100 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Total Calories</h3>
        <div className="text-2xl font-bold text-walmart-blue">{totalCalories} kcal</div>
        <div className="mt-2 text-gray-700">
          Calorie Target: <span className="font-semibold">{calorieTarget} kcal</span>
        </div>
        <div className="mt-2">
          {totalCalories > calorieTarget ? (
            <span className="text-red-600 font-semibold">You are over your target!</span>
          ) : (
            <span className="text-green-600 font-semibold">Within your target!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
