import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, ChefHat, Clock, Utensils, CheckCircle2 } from 'lucide-react';
import { Meal } from '../types';

interface RecipeProps {
  meal: Meal;
  onBack: () => void;
  onLog: () => void;
}

export function Recipe({ meal, onBack, onLog }: RecipeProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  if (!meal.recipe) return null;

  const toggleIngredient = (index: number) => {
    const newSet = new Set(checkedIngredients);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setCheckedIngredients(newSet);
  };

  const toggleStep = (index: number) => {
    const newSet = new Set(checkedSteps);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setCheckedSteps(newSet);
  };

  const handleComplete = () => {
    setCompleted(true);
    onLog();
  };

  const allStepsChecked = checkedSteps.size === meal.recipe.instructions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div>Recipe: {meal.name}</div>
            <div className="text-sm text-gray-500 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {meal.recipe.prepTime + meal.recipe.cookTime} min
              </span>
              <Badge variant="outline" className="text-xs capitalize">
                {meal.recipe.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Recipe Overview */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="mb-1">Cooking Time</div>
              <div className="text-sm text-gray-600">
                Prep: {meal.recipe.prepTime} min • Cook: {meal.recipe.cookTime} min
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{meal.calories} cal</Badge>
            <Badge variant="outline">{meal.protein}g protein</Badge>
            <Badge variant="outline">{meal.carbs}g carbs</Badge>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-gray-600" />
            <span>Ingredients</span>
          </div>
          <div className="space-y-3">
            {meal.recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <Checkbox
                  id={`ingredient-${index}`}
                  checked={checkedIngredients.has(index)}
                  onCheckedChange={() => toggleIngredient(index)}
                  className="mt-1"
                />
                <label
                  htmlFor={`ingredient-${index}`}
                  className={`flex-1 cursor-pointer ${
                    checkedIngredients.has(index)
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {ingredient}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
            {checkedIngredients.size} of {meal.recipe.ingredients.length} ingredients checked
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-gray-600" />
            <span>Instructions</span>
          </div>
          <div className="space-y-4">
            {meal.recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Checkbox
                    id={`step-${index}`}
                    checked={checkedSteps.has(index)}
                    onCheckedChange={() => toggleStep(index)}
                  />
                </div>
                <div className="flex-1">
                  <div className={`flex items-center gap-2 mb-2 ${
                    checkedSteps.has(index) ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      checkedSteps.has(index)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <label
                      htmlFor={`step-${index}`}
                      className={`cursor-pointer ${
                        checkedSteps.has(index) ? 'line-through' : ''
                      }`}
                    >
                      Step {index + 1}
                    </label>
                  </div>
                  <div className={`text-sm pl-8 ${
                    checkedSteps.has(index) ? 'text-gray-400 line-through' : 'text-gray-600'
                  }`}>
                    {instruction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Button */}
        {!completed ? (
          <Button
            onClick={handleComplete}
            className="w-full"
            size="lg"
            disabled={!allStepsChecked}
          >
            {allStepsChecked ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete & Log Meal
              </>
            ) : (
              `Complete all steps (${checkedSteps.size}/${meal.recipe.instructions.length})`
            )}
          </Button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-green-800 mb-1">Meal Complete!</div>
            <div className="text-sm text-green-600">
              Your meal has been logged to your daily progress
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
