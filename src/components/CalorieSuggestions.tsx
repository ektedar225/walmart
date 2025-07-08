import React from 'react';
import { Product } from '../types';

interface CalorieSuggestionsProps {
  cart: Product[];
  calorieTarget: number;
}

const CalorieSuggestions: React.FC<CalorieSuggestionsProps> = ({ cart, calorieTarget }) => {
  const totalCalories = cart.reduce((sum, p) => sum + (p.nutrition?.calories || 0), 0);
  const diff = calorieTarget - totalCalories;

  let suggestion = '';
  if (diff > 100) {
    suggestion = `You can add about ${diff} kcal more to reach your target.`;
  } else if (diff < -100) {
    suggestion = `You are over your target by ${-diff} kcal. Consider removing some items or choosing lower-calorie options.`;
  } else {
    suggestion = 'You are very close to your calorie target!';
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6 text-center">
      <h3 className="text-lg font-bold text-walmart-blue mb-2">Calorie Suggestions</h3>
      <p className="text-gray-700">{suggestion}</p>
    </div>
  );
};

export default CalorieSuggestions;
