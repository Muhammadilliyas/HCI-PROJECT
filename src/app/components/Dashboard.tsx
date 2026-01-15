import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { User, SlidersHorizontal, Clock, TrendingUp } from 'lucide-react';
import { UserData } from './Onboarding';
import { Meal } from '../types';

interface DashboardProps {
  userData: UserData;
  meals: Meal[];
  onMealSelect: (meal: Meal) => void;
  onProfileClick: () => void;
}

export function Dashboard({ userData, meals, onMealSelect, onProfileClick }: DashboardProps) {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [macroFilter, setMacroFilter] = useState<string | null>(null);

  const filteredMeals = meals.filter((meal) => {
    const priceMatch = meal.price >= priceRange[0] && meal.price <= priceRange[1];
    const macroMatch = !macroFilter || meal.macroHighlight === macroFilter;
    return priceMatch && macroMatch;
  });

  const calculateDailyProgress = () => {
    // Mock progress for demo
    return {
      calories: 1250,
      target: 2000,
      protein: 65,
      carbs: 140,
    };
  };

  const progress = calculateDailyProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Welcome back,</p>
          </div>
          <button
            onClick={onProfileClick}
            className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
          >
            <User className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Daily Progress */}
        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Today's Progress</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl">{progress.calories}</span>
            <span className="text-xl opacity-75">/ {progress.target} kcal</span>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <div className="opacity-75">Protein</div>
              <div>{progress.protein}g</div>
            </div>
            <div>
              <div className="opacity-75">Carbs</div>
              <div>{progress.carbs}g</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span>Filters</span>
            </div>
            <Badge variant="secondary">{filteredMeals.length} meals</Badge>
          </button>

          {showFilters && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={50}
                  step={5}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Macro Focus</label>
                <div className="flex gap-2">
                  {['protein', 'carbs', 'balanced'].map((macro) => (
                    <button
                      key={macro}
                      onClick={() => setMacroFilter(macroFilter === macro ? null : macro)}
                      className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${
                        macroFilter === macro
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {macro}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Meals */}
        <div className="mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span>Recommended for You</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <button
              key={meal.id}
              onClick={() => onMealSelect(meal)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="mb-1">{meal.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {meal.calories} cal
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs capitalize"
                      >
                        {meal.macroHighlight}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-green-600">${meal.price}</span>
                  <span className="text-xs text-gray-500">{meal.restaurant}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No meals match your current filters. Try adjusting them!
          </div>
        )}
      </div>
    </div>
  );
}
