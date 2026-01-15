import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, ChefHat, Heart, Clock } from 'lucide-react';
import { Meal } from '../types';
import { Navigation } from './Navigation';
import { Recipe } from './Recipe';

interface MealDetailProps {
  meal: Meal;
  onBack: () => void;
  onFavorite: (mealId: string) => void;
  onLog: (mealId: string) => void;
  isFavorite: boolean;
}

export function MealDetail({ meal, onBack, onFavorite, onLog, isFavorite }: MealDetailProps) {
  const [mode, setMode] = useState<'decision' | 'buy' | 'make'>('decision');
  const [hasLogged, setHasLogged] = useState(false);

  const handleLog = () => {
    onLog(meal.id);
    setHasLogged(true);
  };

  if (mode === 'buy' && meal.location) {
    return <Navigation meal={meal} onBack={() => setMode('decision')} />;
  }

  if (mode === 'make' && meal.recipe) {
    return <Recipe meal={meal} onBack={() => setMode('decision')} onLog={handleLog} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onFavorite(meal.id)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Meal Info */}
        <div className="bg-white rounded-xl p-6 -mt-12 relative shadow-lg mb-6">
          <div className="mb-4">{meal.name}</div>
          <div className="text-gray-600 mb-4">{meal.restaurant}</div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline">
              {meal.calories} calories
            </Badge>
            <Badge variant="outline">
              {meal.protein}g protein
            </Badge>
            <Badge variant="outline">
              {meal.carbs}g carbs
            </Badge>
            <Badge variant="outline">
              {meal.fats}g fats
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-2xl text-green-600">
              ${meal.price}
            </div>
            <Badge variant="secondary" className="capitalize">
              {meal.macroHighlight} focused
            </Badge>
          </div>
        </div>

        {/* Decision: Buy or Make */}
        <div className="mb-6">
          <div className="mb-4 text-center text-gray-600">How would you like to get this meal?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meal.canBuy && (
              <button
                onClick={() => setMode('buy')}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="mb-2">Buy from {meal.restaurant}</div>
                <div className="text-sm text-gray-500">
                  {meal.location?.distance} • {meal.location?.estimatedTime}
                </div>
              </button>
            )}

            {meal.canMake && (
              <button
                onClick={() => setMode('make')}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <ChefHat className="w-6 h-6 text-blue-600" />
                </div>
                <div className="mb-2">Make it yourself</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meal.recipe?.prepTime! + meal.recipe?.cookTime!} min • {meal.recipe?.difficulty}
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <div className="text-sm text-gray-500 mb-3">Quick Actions</div>
          <div className="flex gap-2">
            <Button
              onClick={handleLog}
              variant={hasLogged ? "secondary" : "default"}
              className="flex-1"
              disabled={hasLogged}
            >
              {hasLogged ? 'Logged ✓' : 'Log This Meal'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
