export interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  price: number;
  restaurant: string;
  macroHighlight: 'protein' | 'carbs' | 'balanced';
  canBuy: boolean;
  canMake: boolean;
  location?: {
    lat: number;
    lng: number;
    address: string;
    distance: string;
    estimatedTime: string;
  };
  recipe?: {
    ingredients: string[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
}
