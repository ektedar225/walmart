import React, { useState } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import LoadingSpinner from './components/LoadingSpinner';
import RecommendationResults from './components/RecommendationResults';
import CartSummary from './components/CartSummary';
import CalorieSuggestions from './components/CalorieSuggestions';
import { generateRecommendations } from './services/openai';
import { UserResponse, UserProfile, Recommendation } from './types';
import { cookingOils, rice, flours, sauces, peanutButter, cereals, plantMilks, yogurt, cannedBeans, snackBars, frozenVegetables, herbalTeas } from './data/gros';
import electronics from './data/electonics';
import skincare from './data/skincare';

import { calculateBMR, getActivityFactor, getCalorieTarget, Gender } from './utils/calorie';

type AppState = 'questionnaire' | 'loading' | 'results' | 'cart';


function App() {
  const [appState, setAppState] = useState<AppState>('questionnaire');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [mode, setMode] = useState<string>('');
  const [showCustom, setShowCustom] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [calorieTarget, setCalorieTarget] = useState<number>(0);

  const handleQuestionnaireComplete = async (responses: UserResponse[], selectedMode: string) => {
    setAppState('loading');
    setMode(selectedMode);

    let apiInput: any = {};
    let relevantProducts: any[] = [];

    if (selectedMode === '🥗 Healthcare Grocery') {
      // Extract user data from responses
      const age = Number(responses.find(r => r.questionId === 'age')?.answer || 0);
      const genderRaw = responses.find(r => r.questionId === 'gender')?.answer || '';
      const gender = Array.isArray(genderRaw) ? genderRaw[0].toLowerCase() : genderRaw.toLowerCase();
      const height = Number(responses.find(r => r.questionId === 'height')?.answer || 0);
      const weight = Number(responses.find(r => r.questionId === 'weight')?.answer || 0);
      const activityLevelAns = responses.find(r => r.questionId === 'activity-level')?.answer || '';
      const activityLevelRaw = Array.isArray(activityLevelAns) ? activityLevelAns[0].toLowerCase() : activityLevelAns.toLowerCase();
      const goalAns = responses.find(r => r.questionId === 'goal')?.answer || '';
      const goalRaw = Array.isArray(goalAns) ? goalAns[0].toLowerCase() : goalAns.toLowerCase();
      const dietaryPreference = responses.find(r => r.questionId === 'dietary-preference')?.answer as string || '';
      // Map UI values to util values
      const activityLevelMap: any = {
        'sedentary': 'sedentary',
        'light': 'light',
        'moderate': 'moderate',
        'active': 'active',
        'very active': 'very active',
      };
      const goalMap: any = {
        'maintain weight': 'maintain',
        'lose weight': 'lose',
        'gain weight': 'gain',
      };
      const activityLevel = activityLevelMap[activityLevelRaw] || 'sedentary';
      const goal = goalMap[goalRaw] || 'maintain';

      // Calculate BMR, TDEE, and calorie target
      const genderValue: Gender = gender === 'male' ? 'male' : 'female';
      const bmr = calculateBMR({ gender: genderValue, weight, height, age });
      const tdee = bmr * getActivityFactor(activityLevel);
      const calorieTarget = getCalorieTarget(tdee, goal);
      setCalorieTarget(calorieTarget);

      // Build user profile for OpenAI
      const userProfile: UserProfile = {
        healthGoal: goalRaw,
        dietaryPreference,
        ageGroup: age.toString(),
        healthConditions: [],
        activityLevel: activityLevelRaw,
        // Optionally add calorieTarget to userProfile if needed
      };
      apiInput = { ...userProfile, calorieTarget };
      // Combine all grocery arrays into one
      relevantProducts = [
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
    } else if (selectedMode === '📱 Electronics') {
      apiInput = responses;
      // Combine all arrays in the electronics object into one array
      relevantProducts = [
        ...(electronics.laptops || []),
        ...(electronics.mobiles || [])
      ];
    } else if (selectedMode === '💄 Skincare') {
      apiInput = responses;
      relevantProducts = skincare;
    } else if (selectedMode === '✏️ Custom Mode') {
      apiInput = responses;
      relevantProducts = [];
    }

    try {
      const recs = await generateRecommendations(apiInput, relevantProducts);
      setRecommendations(recs);
      setAppState('results');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setAppState('questionnaire');
    }
  };

  const handleRestart = () => {
    setAppState('questionnaire');
    setRecommendations([]);
    setMode('');
    setCart([]);
    setCalorieTarget(0);
  };

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    setAppState('cart');
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const handleCartClick = () => {
    setAppState('cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-blue-light to-white">
      <Header onCartClick={handleCartClick} cartCount={cart.length} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowCustom(v => !v)}
          >
            {showCustom ? 'Back to Main' : 'Custom Recommendation'}
          </button>
        </div>
        {showCustom ? (
          <CustomRecommendation />
        ) : (
          <>
            {appState === 'questionnaire' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Find Your Perfect Products
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Answer a few quick questions and get AI-powered recommendations tailored to your needs.
                  </p>
                </div>
                <Questionnaire onComplete={handleQuestionnaireComplete} />
              </div>
            )}

            {appState === 'loading' && (
              <div className="max-w-2xl mx-auto">
                <LoadingSpinner />
              </div>
            )}

            <div className="max-w-7xl mx-auto">
              {appState === 'results' && (
                <RecommendationResults
                  recommendations={recommendations}
                  onRestart={handleRestart}
                  onAddToCart={handleAddToCart}
                />
              )}
            {appState === 'cart' && (
                <>
                  <CartSummary cart={cart} calorieTarget={calorieTarget} onRemove={handleRemoveFromCart} />
                  <CalorieSuggestions cart={cart} calorieTarget={calorieTarget} />
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      className="bg-walmart-blue text-white px-6 py-3 rounded-lg hover:bg-walmart-blue-dark"
                      onClick={handleRestart}
                    >
                      Start Over
                    </button>
                    <button
                      className="bg-gray-200 text-walmart-blue px-6 py-3 rounded-lg hover:bg-gray-300"
                      onClick={() => setAppState('results')}
                    >
                      Back to Recommendations
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
      <footer className="bg-walmart-blue text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-100">
            Powered by AI • Trusted by Walmart • Made for Your Health
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;