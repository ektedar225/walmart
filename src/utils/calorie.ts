// Utility functions for BMR, TDEE, and calorie target calculations
export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
export type Goal = 'maintain' | 'lose' | 'gain';

export function calculateBMR({ gender, weight, height, age }: { gender: Gender, weight: number, height: number, age: number }): number {
  // weight in kg, height in cm, age in years
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function getActivityFactor(activityLevel: ActivityLevel): number {
  switch (activityLevel) {
    case 'sedentary': return 1.2;
    case 'light': return 1.375;
    case 'moderate': return 1.55;
    case 'active': return 1.725;
    case 'very active': return 1.9;
    default: return 1.2;
  }
}

export function getCalorieTarget(tdee: number, goal: Goal): number {
  if (goal === 'lose') return tdee - 500;
  if (goal === 'gain') return tdee + 500;
  return tdee;
}
