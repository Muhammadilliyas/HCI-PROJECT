import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, User, Heart, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { UserData } from './Onboarding';
import { Meal } from '../types';

interface ProfileProps {
  userData: UserData;
  onBack: () => void;
  favorites: string[];
  loggedMeals: Array<{ mealId: string; timestamp: number }>;
  meals: Meal[];
}

export function Profile({ userData, onBack, favorites, loggedMeals, meals }: ProfileProps) {
  const calculateStats = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayMeals = loggedMeals.filter(
      (log) => new Date(log.timestamp).setHours(0, 0, 0, 0) === today
    );

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    todayMeals.forEach((log) => {
      const meal = meals.find((m) => m.id === log.mealId);
      if (meal) {
        totalCalories += meal.calories;
        totalProtein += meal.protein;
        totalCarbs += meal.carbs;
        totalFats += meal.fats;
      }
    });

    const targetCalories = 2000; // Could calculate based on user data
    const targetProtein = 150;

    return {
      todayMeals: todayMeals.length,
      totalMeals: loggedMeals.length,
      totalCalories,
      targetCalories,
      totalProtein,
      targetProtein,
      totalCarbs,
      totalFats,
      calorieProgress: Math.min((totalCalories / targetCalories) * 100, 100),
      proteinProgress: Math.min((totalProtein / targetProtein) * 100, 100),
    };
  };

  const stats = calculateStats();
  const favoriteMeals = meals.filter((meal) => favorites.includes(meal.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="w-10 h-10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <div className="text-2xl mb-1">{userData.name}</div>
              <div className="text-sm opacity-90">
                {userData.age} years • {userData.height} cm • {userData.weight} kg
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{stats.totalMeals}</div>
              <div className="text-xs opacity-90">Total Meals</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{favorites.length}</div>
              <div className="text-xs opacity-90">Favorites</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{stats.todayMeals}</div>
              <div className="text-xs opacity-90">Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Today's Progress */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span>Today's Nutrition</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Calories</span>
                <span className="text-sm">
                  {stats.totalCalories} / {stats.targetCalories} kcal
                </span>
              </div>
              <Progress value={stats.calorieProgress} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Protein</span>
                <span className="text-sm">
                  {stats.totalProtein}g / {stats.targetProtein}g
                </span>
              </div>
              <Progress value={stats.proteinProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-sm text-gray-600">Carbs</div>
                <div>{stats.totalCarbs}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Fats</div>
                <div>{stats.totalFats}g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals & Preferences */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-gray-600" />
            <span>Your Preferences</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Activity Level</span>
              <Badge variant="outline" className="capitalize">
                {userData.activityLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">Diet Preference</span>
              <Badge variant="outline" className="capitalize">
                {userData.dietPreference.replace('-', ' ')}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Daily Budget</span>
              <Badge variant="outline">${userData.budget}</Badge>
            </div>
          </div>
        </div>

        {/* Favorite Meals */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-gray-600" />
            <span>Favorite Meals</span>
          </div>

          {favoriteMeals.length > 0 ? (
            <div className="space-y-3">
              {favoriteMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1">{meal.name}</div>
                    <div className="text-sm text-gray-500">{meal.calories} cal</div>
                  </div>
                  <Badge variant="secondary">${meal.price}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              No favorite meals yet. Start adding some!
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gray-600" />
            <span>Achievements</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-sm mb-1">1 Day Streak</div>
              <div className="text-xs text-gray-600">Keep it up!</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center opacity-50">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm mb-1">Goal Master</div>
              <div className="text-xs text-gray-600">Hit 7 day streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
