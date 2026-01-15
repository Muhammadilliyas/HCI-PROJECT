import { useState } from 'react';
import { Onboarding, UserData } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { MealDetail } from './components/MealDetail';
import { Profile } from './components/Profile';
import { Meal } from './types';

// Mock meal data
const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Power Bowl',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzY3NDg5OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 520,
    protein: 45,
    carbs: 42,
    fats: 18,
    price: 12,
    restaurant: 'Healthy Eats',
    macroHighlight: 'protein',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '123 Fitness Ave, New York, NY 10001',
      distance: '0.8 miles',
      estimatedTime: '15 min',
    },
    recipe: {
      ingredients: [
        '2 chicken breasts (6 oz each)',
        '2 cups brown rice',
        '1 cup broccoli florets',
        '1 red bell pepper, sliced',
        '2 tbsp olive oil',
        '2 tsp garlic powder',
        'Salt and pepper to taste',
        '1 lemon',
      ],
      instructions: [
        'Season chicken breasts with garlic powder, salt, and pepper',
        'Heat 1 tbsp olive oil in a grill pan over medium-high heat',
        'Grill chicken for 6-7 minutes per side until fully cooked',
        'Meanwhile, cook brown rice according to package instructions',
        'Steam broccoli and bell peppers for 5 minutes',
        'Slice cooked chicken and arrange over rice with vegetables',
        'Drizzle with remaining olive oil and lemon juice',
      ],
      prepTime: 15,
      cookTime: 25,
      difficulty: 'easy',
    },
  },
  {
    id: '2',
    name: 'Teriyaki Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1599253336132-b3d7cc7799eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjByaWNlJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3Njc0MzU2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 580,
    protein: 38,
    carbs: 62,
    fats: 22,
    price: 16,
    restaurant: 'Pacific Bowl',
    macroHighlight: 'balanced',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '456 Ocean St, New York, NY 10002',
      distance: '1.2 miles',
      estimatedTime: '20 min',
    },
    recipe: {
      ingredients: [
        '1 salmon fillet (6 oz)',
        '1.5 cups white rice',
        '1 cup edamame',
        '1 carrot, julienned',
        '3 tbsp teriyaki sauce',
        '1 tbsp sesame seeds',
        '2 green onions, sliced',
        '1 tsp sesame oil',
      ],
      instructions: [
        'Cook rice according to package instructions',
        'Preheat oven to 400°F (200°C)',
        'Brush salmon with teriyaki sauce',
        'Bake salmon for 12-15 minutes until cooked through',
        'Steam edamame for 5 minutes',
        'Arrange rice in bowl, top with salmon',
        'Add edamame and carrots, garnish with sesame seeds and green onions',
        'Drizzle with sesame oil',
      ],
      prepTime: 10,
      cookTime: 20,
      difficulty: 'easy',
    },
  },
  {
    id: '3',
    name: 'Mediterranean Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1640718153995-db4d3f0a6337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYm93bCUyMHNhbGFkfGVufDF8fHx8MTc2NzUxMzQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 420,
    protein: 18,
    carbs: 55,
    fats: 16,
    price: 11,
    restaurant: 'Green Valley',
    macroHighlight: 'carbs',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: '789 Garden Blvd, New York, NY 10003',
      distance: '0.5 miles',
      estimatedTime: '10 min',
    },
    recipe: {
      ingredients: [
        '1 cup quinoa',
        '1 cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/2 cup feta cheese, crumbled',
        '1/4 cup kalamata olives',
        '1/4 red onion, diced',
        '2 tbsp olive oil',
        '1 tbsp lemon juice',
        'Fresh parsley',
      ],
      instructions: [
        'Cook quinoa according to package instructions and let cool',
        'Dice cucumber, tomatoes, and red onion',
        'Combine all vegetables in a large bowl',
        'Add cooled quinoa',
        'Top with feta cheese and olives',
        'Whisk together olive oil and lemon juice',
        'Drizzle dressing over bowl and garnish with parsley',
      ],
      prepTime: 10,
      cookTime: 15,
      difficulty: 'easy',
    },
  },
  {
    id: '4',
    name: 'Berry Protein Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1597776776723-0153bbc0d3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwc21vb3RoaWUlMjBib3dsfGVufDF8fHx8MTc2NzUxMzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 350,
    protein: 28,
    carbs: 48,
    fats: 8,
    price: 9,
    restaurant: 'Smoothie Studio',
    macroHighlight: 'protein',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7565,
      lng: -73.9800,
      address: '321 Berry Lane, New York, NY 10004',
      distance: '0.3 miles',
      estimatedTime: '8 min',
    },
    recipe: {
      ingredients: [
        '1 cup frozen mixed berries',
        '1 banana',
        '1 scoop vanilla protein powder',
        '1 cup almond milk',
        '1/4 cup granola',
        '1 tbsp chia seeds',
        '1 tbsp almond butter',
        'Fresh berries for topping',
      ],
      instructions: [
        'Combine frozen berries, banana, protein powder, and almond milk in blender',
        'Blend until smooth and thick',
        'Pour into a bowl',
        'Top with granola, chia seeds, and fresh berries',
        'Drizzle with almond butter',
        'Serve immediately',
      ],
      prepTime: 5,
      cookTime: 0,
      difficulty: 'easy',
    },
  },
  {
    id: '5',
    name: 'Buddha Bowl Deluxe',
    image: 'https://images.unsplash.com/photo-1589442305595-62647c1514f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwYnVkZGhhJTIwYm93bHxlbnwxfHx8fDE3Njc1MTM0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 480,
    protein: 22,
    carbs: 68,
    fats: 14,
    price: 13,
    restaurant: 'Zen Kitchen',
    macroHighlight: 'balanced',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7600,
      lng: -73.9820,
      address: '555 Wellness Way, New York, NY 10005',
      distance: '1.0 miles',
      estimatedTime: '18 min',
    },
    recipe: {
      ingredients: [
        '1 cup chickpeas, cooked',
        '1 sweet potato, cubed',
        '2 cups kale',
        '1/2 cup quinoa, cooked',
        '1/4 avocado, sliced',
        '2 tbsp tahini',
        '1 tbsp lemon juice',
        '1 tsp cumin',
        'Pumpkin seeds for garnish',
      ],
      instructions: [
        'Preheat oven to 425°F (220°C)',
        'Toss sweet potato cubes with olive oil and cumin',
        'Roast for 20-25 minutes until tender',
        'Massage kale with a bit of olive oil',
        'Season and roast chickpeas for 15 minutes',
        'Arrange quinoa, kale, sweet potato, and chickpeas in bowl',
        'Top with avocado slices',
        'Mix tahini with lemon juice and drizzle over bowl',
        'Garnish with pumpkin seeds',
      ],
      prepTime: 15,
      cookTime: 25,
      difficulty: 'medium',
    },
  },
  {
    id: '6',
    name: 'Asian Stir Fry Bowl',
    image: 'https://images.unsplash.com/photo-1599297915779-0dadbd376d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGlyJTIwZnJ5JTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3Njc0NzU3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 440,
    protein: 32,
    carbs: 52,
    fats: 12,
    price: 14,
    restaurant: 'Wok & Roll',
    macroHighlight: 'protein',
    canBuy: true,
    canMake: true,
    location: {
      lat: 40.7620,
      lng: -73.9790,
      address: '888 Stir Fry Street, New York, NY 10006',
      distance: '1.5 miles',
      estimatedTime: '22 min',
    },
    recipe: {
      ingredients: [
        '8 oz chicken or tofu, cubed',
        '2 cups mixed vegetables (broccoli, carrots, snap peas)',
        '1 cup rice noodles',
        '2 tbsp soy sauce',
        '1 tbsp ginger, minced',
        '2 cloves garlic, minced',
        '1 tbsp sesame oil',
        '1 tsp sriracha (optional)',
      ],
      instructions: [
        'Cook rice noodles according to package instructions',
        'Heat sesame oil in a large wok or pan',
        'Add garlic and ginger, sauté for 30 seconds',
        'Add chicken/tofu and cook until golden',
        'Add vegetables and stir fry for 5-7 minutes',
        'Add soy sauce and sriracha',
        'Toss in cooked noodles',
        'Serve hot',
      ],
      prepTime: 10,
      cookTime: 15,
      difficulty: 'medium',
    },
  },
];

type View = 'onboarding' | 'dashboard' | 'meal-detail' | 'profile';

export default function App() {
  const [view, setView] = useState<View>('onboarding');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<Array<{ mealId: string; timestamp: number }>>([]);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setView('dashboard');
  };

  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal);
    setView('meal-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedMeal(null);
    setView('dashboard');
  };

  const handleProfileClick = () => {
    setView('profile');
  };

  const handleToggleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
  };

  const handleLogMeal = (mealId: string) => {
    setLoggedMeals((prev) => [...prev, { mealId, timestamp: Date.now() }]);
  };

  return (
    <div className="min-h-screen">
      {view === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}

      {view === 'dashboard' && userData && (
        <Dashboard
          userData={userData}
          meals={MOCK_MEALS}
          onMealSelect={handleMealSelect}
          onProfileClick={handleProfileClick}
        />
      )}

      {view === 'meal-detail' && selectedMeal && (
        <MealDetail
          meal={selectedMeal}
          onBack={handleBackToDashboard}
          onFavorite={handleToggleFavorite}
          onLog={handleLogMeal}
          isFavorite={favorites.includes(selectedMeal.id)}
        />
      )}

      {view === 'profile' && userData && (
        <Profile
          userData={userData}
          onBack={handleBackToDashboard}
          favorites={favorites}
          loggedMeals={loggedMeals}
          meals={MOCK_MEALS}
        />
      )}
    </div>
  );
}
