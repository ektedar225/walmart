import { Question } from '../types';

export const modeQuestions = [
  {
    id: 'mode',
    question: 'What do you want to shop for?',
    type: 'single' as const,
    options: [
      '🥗 Healthcare Grocery',
      '📱 Electronics',
      '💄 Skincare',
      '✏️ Custom Mode'
    ]
  }
];

export const electronicsQuestions: Question[] = [
  {
    id: 'device-type',
    question: 'What is your preferred device type?',
    type: 'single',
    options: ['Mobile', 'Laptop', 'Headphones', 'Accessories', 'No Preference']
  },
  {
    id: 'feature-priority',
    question: 'Which feature matters the most to you?',
    type: 'single',
    options: ['Battery Life', 'Camera Quality', 'Performance', 'Brand', 'Price']
  },
  {
    id: 'budget',
    question: 'What is your budget range for electronics?',
    type: 'single',
    options: ['Under $200', '$200-$500', '$500-$1000', 'Above $1000']
  },
  {
    id: 'model-preference',
    question: 'Do you prefer latest models or are refurbished/older models acceptable?',
    type: 'single',
    options: ['Latest Only', 'Refurbished/Older Also Fine']
  },
  {
    id: 'upgrade-frequency',
    question: 'How often do you upgrade your electronic devices?',
    type: 'single',
    options: ['Every 6 months', 'Once a year', 'Once in 2 years', 'Rarely']
  }
];

export const skincareQuestions: Question[] = [
  {
    id: 'skin-concern',
    question: 'What is your primary skin concern?',
    type: 'single',
    options: ['Acne', 'Dryness', 'Oily Skin', 'Aging', 'Sensitivity']
  },
  {
    id: 'skincare-type',
    question: 'What type of skincare products do you prefer?',
    type: 'single',
    options: ['Creams', 'Serums', 'Face Wash', 'Masks', 'No Preference']
  },
  {
    id: 'skin-type',
    question: 'What is your skin type?',
    type: 'single',
    options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
  },
  {
    id: 'fragrance',
    question: 'Do you prefer fragrance-free or naturally scented skincare?',
    type: 'single',
    options: ['Fragrance-Free', 'Naturally Scented', 'No Preference']
  },
  {
    id: 'routine-frequency',
    question: 'What is your skincare routine frequency?',
    type: 'single',
    options: ['Daily', 'Weekly', 'Occasionally', 'Rarely']
  }
];

export const groceryQuestions: Question[] = [
  {
    id: 'health-goal',
    question: 'What is your primary health goal?',
    type: 'single',
    options: ['Weight Loss', 'Weight Gain', 'Muscle Building', 'Sugar Control', 'General Wellness']
  },
  {
    id: 'dietary-preference',
    question: 'What is your dietary preference?',
    type: 'single',
    options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Gluten-Free', 'No Preference']
  },
  {
    id: 'product-type',
    question: 'Are you looking for specific product types?',
    type: 'single',
    options: ['Snacks', 'Supplements', 'Staples', 'Drinks', 'No Preference']
  },
  {
    id: 'health-conditions',
    question: 'Do you have any health conditions that need special dietary attention?',
    type: 'single',
    options: ['Diabetes', 'PCOD', 'High Blood Pressure', 'None']
  },
  {
    id: 'organic',
    question: 'Do you prefer organic or regular grocery items?',
    type: 'single',
    options: ['Organic Only', 'Regular Also Fine', 'No Preference']
  }
];

export const customQuestions: Question[] = [];

export const questions: Question[] = [
  {
    id: 'health-goal',
    question: 'What is your primary health goal?',
    type: 'single',
    options: [
      'Weight Loss',
      'Weight Gain',
      'Muscle Building',
      'Skin Health Improvement',
      'Maintain Current Weight',
      'Improve Energy',
      'Sugar Control'
      
    ]
  },
  {
    id: 'dietary-preference',
    question: 'What is your dietary preference?',
    type: 'single',
    options: [
      'Vegetarian',
      'Non-Vegetarian',
      'Vegan',
      'Keto',
      'Paleo',
      'No Preference'
    ]
  },
  {
    id: 'age-group',
    question: 'What is your age group?',
    type: 'single',
    options: [
      '18-25',
      '26-35',
      '36-45',
      '46-55',
      '56-65',
      '65+'
    ]
  },
  {
    id: 'health-conditions',
    question: 'Do you have any of these health conditions? (Select all that apply)',
    type: 'multiple',
    options: [
      'Diabetes',
      'High Blood Pressure',
      'PCOD/PCOS',
      'Thyroid Issues',
      'Heart Disease',
      'High Cholesterol',
      'None of the above'
    ]
  },
  {
    id: 'activity-level',
    question: 'How would you describe your activity level?',
    type: 'single',
    options: [
      'Sedentary (little to no exercise)',
      'Lightly Active (light exercise 1-3 days/week)',
      'Moderately Active (moderate exercise 3-5 days/week)',
      'Very Active (hard exercise 6-7 days/week)',
      'Extremely Active (very hard exercise, physical job)'
    ]
  },
  {
    id: 'skin-type',
    question: 'What is your skin type?',
    type: 'single',
    options: [
      'Dry',
      'Oily',
      'Combination',
      'Normal',
      'Sensitive',
      "I'm not sure"
    ]
  },
  {
    id: 'skin-concerns',
    question: 'What are your primary skin concerns? (Select all that apply)',
    type: 'multiple',
    options: [
      'Acne',
      'Aging/Wrinkles',
      'Dark Spots/Hyperpigmentation',
      'Dryness/Flakiness',
      'Redness/Rosacea',
      'Dullness',
      'Oiliness',
      'Dark Circles',
      'Puffiness',
      'None of the above'
    ]
  },
  {
    id: 'current-skin-routine',
    question: 'How would you describe your current skin care routine?',
    type: 'single',
    options: [
      'None - I don\'t have a routine',
      'Basic (cleanser + moisturizer)',
      'Moderate (cleanser + treatment + moisturizer)',
      'Advanced (multiple steps with specialized products)',
      'Comprehensive (full routine with regular treatments)'
    ]
  },
  {
    id: 'skin-allergies',
    question: 'Do you have any known skin allergies or sensitivities to products?',
    type: 'single',
    options: [
      'Yes',
      'No',
      "I'm not sure"
    ]
  }
];