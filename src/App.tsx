import React, { useState } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import LoadingSpinner from './components/LoadingSpinner';
import RecommendationResults from './components/RecommendationResults';
import { generateRecommendations } from './services/openai';
import { UserResponse, UserProfile, Recommendation } from './types';
import { cookingOils, rice, flours, sauces, peanutButter, cereals, plantMilks, yogurt, cannedBeans, snackBars, frozenVegetables, herbalTeas } from './data/gros';
import electronics from './data/electonics';
import skincare from './data/skincare';
import CustomRecommendation from './components/CustomRecommendation';
import { calculateBMR, getActivityFactor, getCalorieTarget } from './utils/calorie';

type AppState = 'questionnaire' | 'loading' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('questionnaire');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [mode, setMode] = useState<string>('');
  const [showCustom, setShowCustom] = useState(false);

  const handleQuestionnaireComplete = async (responses: UserResponse[], selectedMode: string) => {
    setAppState('loading');
    setMode(selectedMode);

    let apiInput: any = {};
    let relevantProducts: any[] = [];

    if (selectedMode === '🥗 Healthcare Grocery') {
      // Extract user data from responses
      const age = Number(responses.find(r => r.questionId === 'age')?.answer || 0);
      const gender = (responses.find(r => r.questionId === 'gender')?.answer || '').toLowerCase();
      const height = Number(responses.find(r => r.questionId === 'height')?.answer || 0);
      const weight = Number(responses.find(r => r.questionId === 'weight')?.answer || 0);
      const activityLevelRaw = (responses.find(r => r.questionId === 'activity-level')?.answer || '').toLowerCase();
      const goalRaw = (responses.find(r => r.questionId === 'goal')?.answer || '').toLowerCase();
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
      const bmr = calculateBMR({ gender, weight, height, age });
      const tdee = bmr * getActivityFactor(activityLevel);
      const calorieTarget = getCalorieTarget(tdee, goal);

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-blue-light to-white">
      <Header />
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
                />
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