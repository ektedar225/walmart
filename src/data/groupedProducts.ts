import { products } from './products';
import { Product } from '../types';

export const groupedProducts: Record<string, Product[]> = {
  'Weight Loss': products.filter(p => p.healthBenefits?.includes('Weight Loss')),
  'Weight Gain': products.filter(p => p.healthBenefits?.includes('Weight Gain')),
  'Muscle Building': products.filter(p => p.healthBenefits?.includes('Muscle Building')),
  'Skin Health Improvement': products.filter(p => p.healthBenefits?.includes('Skin Health Improvement')),
  'Maintain Current Weight': products.filter(p => p.healthBenefits?.includes('Maintain Current Weight')),
  'Improve Energy': products.filter(p => p.healthBenefits?.includes('Improve Energy')),
  'Sugar Control': products.filter(p => p.healthBenefits?.includes('Sugar Control')),
};
