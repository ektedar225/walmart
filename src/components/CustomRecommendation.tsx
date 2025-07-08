import React, { useState } from 'react';
import { generateRecommendations } from '../services/openai';
import { cookingOils, rice, flours, sauces, peanutButter, cereals, plantMilks, yogurt, cannedBeans, snackBars, frozenVegetables, herbalTeas } from '../data/gros';
import electronics from '../data/electonics';
import skincare from '../data/skincare';
import { Recommendation } from '../types';
import CustomRecommendationResults from './CustomRecommendationResults';

const allGrocery = [
  ...cookingOils,
  ...rice,
  ...flours,
  ...sauces,
  ...peanutButter,
  ...cereals,
  ...plantMilks,
  ...yogurt,
  ...cannedBeans,
  ...snackBars,
  ...frozenVegetables,
  ...herbalTeas
];

const productSources = [
  { label: 'Healthcare Grocery', value: 'grocery', products: allGrocery },
  { label: 'Electronics', value: 'electronics', products: electronics },
  { label: 'Skincare', value: 'skincare', products: skincare }
];

export default function CustomRecommendation() {
  const [input, setInput] = useState('');
  const [source, setSource] = useState('grocery');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations([]);
    setShowResults(false);
    try {
      // For custom, send user input as a pseudo-profile or context
      const userProfile = { healthGoal: input, dietaryPreference: '', ageGroup: '', healthConditions: [], activityLevel: '' };
      let products = productSources.find(s => s.value === source)?.products || [];
      // Add default walmartUrl if missing
      products = Array.isArray(products)
        ? products.map(p => ({
            ...p,
            walmartUrl: (typeof (p as any).walmartUrl === 'string' && (p as any).walmartUrl)
              ? (p as any).walmartUrl
              : `https://www.walmart.com/search?q=${encodeURIComponent(p.name)}`
          }))
        : [];
      const recs = await generateRecommendations(userProfile, products);
      setRecommendations(recs);
      setShowResults(true);
    } catch (err) {
      setError('Failed to get recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setShowResults(false);
    setRecommendations([]);
    setInput('');
    setError('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow mt-8">
      {!showResults ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Custom Product Recommendation</h2>
          <form onSubmit={handleSubmit} className="mb-6">
            <label className="block mb-2 font-semibold">Describe your needs or goals:</label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="e.g. I want snacks for weight loss, or best moisturizer for dry skin, or best budget headphones"
              required
            />
            <label className="block mb-2 font-semibold">Product Category:</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={source}
              onChange={e => setSource(e.target.value)}
            >
              {productSources.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Finding Recommendations...' : 'Get Recommendations'}
            </button>
          </form>
          {error && <div className="text-red-600 mb-4">{error}</div>}
        </>
      ) : (
        <CustomRecommendationResults recommendations={recommendations} onRestart={handleRestart} />
      )}
    </div>
  );
}
