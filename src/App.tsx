import React, { useState } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import LoadingSpinner from './components/LoadingSpinner';
import RecommendationResults from './components/RecommendationResults';
import { groupedProducts } from './data/groupedProducts';
import { generateRecommendations } from './services/openai';
import { UserResponse, UserProfile, Recommendation } from './types';

type AppState = 'questionnaire' | 'loading' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('questionnaire');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [mode, setMode] = useState<string>('');

  const handleQuestionnaireComplete = async (responses: UserResponse[], selectedMode: string) => {
    setAppState('loading');
    setMode(selectedMode);

    let apiInput: any = {};
    let relevantProducts: any[] = [];

    if (selectedMode === '🥗 Healthcare Grocery') {
      // Convert responses to user profile
      const userProfile: UserProfile = {
        healthGoal: responses.find(r => r.questionId === 'health-goal')?.answer as string || '',
        dietaryPreference: responses.find(r => r.questionId === 'dietary-preference')?.answer as string || '',
        ageGroup: '',
        healthConditions: [],
        activityLevel: '',
      };
      apiInput = userProfile;
      relevantProducts = groupedProducts[userProfile.healthGoal] || [];
    } else if (selectedMode === '📱 Electronics') {
      apiInput = responses;
      // You can filter electronics products here if you have them
      relevantProducts = [];
    } else if (selectedMode === '💄 Skincare') {
      apiInput = responses;
      // You can filter skincare products here if you have them
      relevantProducts = [];
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

        {appState === 'results' && (
          <div className="max-w-7xl mx-auto">
            <RecommendationResults 
              recommendations={recommendations}
              onRestart={handleRestart}
            />
          </div>
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