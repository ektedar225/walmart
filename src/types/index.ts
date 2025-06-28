export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: string[];
}

export interface UserResponse {
  questionId: string;
  answer: string | string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  description: string;
  walmartUrl: string;
  rating: number;
  reviews: number;
  healthBenefits?: string[];
  skinBenefits?: string[];
}

export interface Recommendation {
  product: Product;
  score: number;
  reason: string;
  nutritionalMatch: string;
}

export interface UserProfile {
  healthGoal: string;
  dietaryPreference: string;
  ageGroup: string;
  healthConditions: string[];
  activityLevel: string;
}