import OpenAI from 'openai';
import { UserProfile, Product, Recommendation } from '../types';

const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateRecommendations(
  userProfile: UserProfile,
  products: Product[]
): Promise<Recommendation[]> {
  try {
    const prompt = `
      Based on the user profile below, analyze and rank the following products by their suitability for this user's health goals. 
      Provide a detailed nutritional analysis and explanation for each recommendation.

      User Profile:
      - Health Goal: ${userProfile.healthGoal}
      - Dietary Preference: ${userProfile.dietaryPreference}
      - Age Group: ${userProfile.ageGroup}
      - Health Conditions: ${userProfile.healthConditions.join(', ')}
      - Activity Level: ${userProfile.activityLevel}

      Products to analyze:
      ${products.map(p => `
        ${p.name} by ${p.brand}:
        - Calories: ${p.nutrition?.calories ?? 'N/A'}
        - Protein: ${p.nutrition?.protein ?? 'N/A'}g
        - Carbs: ${p.nutrition?.carbs ?? 'N/A'}g
        - Fat: ${p.nutrition?.fat ?? 'N/A'}g
        - Fiber: ${p.nutrition?.fiber ?? 'N/A'}g
        - Sugar: ${p.nutrition?.sugar ?? 'N/A'}g
        - Sodium: ${p.nutrition?.sodium ?? 'N/A'}mg
      `).join('\n')}

      Please provide a JSON response with recommendations in this format:
      {
        "recommendations": [
          {
            "productName": "product name",
            "score": number between 1-10,
            "reason": "brief explanation why this product suits the user's goals",
            "nutritionalMatch": "specific nutritional benefits for their profile"
          }
        ]
      }

      Sort by score (highest first) and only include products with score >= 6.
    `;

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a nutrition expert providing personalized health product recommendations.' },
        { role: 'user', content: prompt }
      ],
      model: 'openai/gpt-4o',
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    const aiResponse = JSON.parse(content);
    const recommendations: Recommendation[] = [];

    for (const rec of aiResponse.recommendations) {
      const product = products.find(p => p.name === rec.productName);
      if (product) {
        recommendations.push({
          product,
          score: rec.score,
          reason: rec.reason,
          nutritionalMatch: rec.nutritionalMatch
        });
      }
    }

    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Fallback recommendations based on basic rules
    return generateFallbackRecommendations(userProfile, products);
  }
}

function generateFallbackRecommendations(
  userProfile: UserProfile,
  products: Product[]
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  products.forEach(product => {
    let score = 5;
    let reason = 'Good nutritional balance';
    let nutritionalMatch = 'Suitable for general health';

    // Basic scoring logic
    if (userProfile.healthGoal === 'Weight Loss') {
      if (product.nutrition && product.nutrition.calories < 100) score += 2;
      if (product.nutrition && product.nutrition.sugar < 5) score += 1;
      reason = 'Low calorie and sugar content supports weight loss';
      nutritionalMatch = 'Helps maintain caloric deficit';
    } else if (userProfile.healthGoal === 'Muscle Building') {
      if (product.nutrition && product.nutrition.protein > 15) score += 3;
      reason = 'High protein content supports muscle development';
      nutritionalMatch = 'Provides essential amino acids';
    } else if (userProfile.healthGoal === 'Sugar Control') {
      if (product.nutrition && product.nutrition.sugar < 3) score += 2;
      if (product.nutrition && product.nutrition.fiber > 3) score += 1;
      reason = 'Low sugar and high fiber help manage blood sugar';
      nutritionalMatch = 'Supports stable glucose levels';
    }

    if (userProfile.dietaryPreference === 'Vegan' && product.brand === 'Garden of Life') {
      score += 1;
      reason += ' and fits vegan lifestyle';
    }

    if (score >= 6) {
      recommendations.push({
        product,
        score,
        reason,
        nutritionalMatch
      });
    }
  });

  return recommendations.sort((a, b) => b.score - a.score);
}