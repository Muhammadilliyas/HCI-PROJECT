import { Button } from './ui/button';
import { ArrowLeft, Navigation as NavigationIcon, MapPin, Clock, Phone } from 'lucide-react';
import { Meal } from '../types';

interface NavigationProps {
  meal: Meal;
  onBack: () => void;
}

export function Navigation({ meal, onBack }: NavigationProps) {
  if (!meal.location) return null;

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
            <div>Navigate to {meal.restaurant}</div>
            <div className="text-sm text-gray-500">{meal.name}</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Map Placeholder */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-6">
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <div className="text-gray-600">Interactive Map View</div>
              <div className="text-sm text-gray-500 mt-2">
                Showing route to {meal.restaurant}
              </div>
            </div>
            {/* Mock location marker */}
            <div className="absolute bottom-24 right-24 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="w-6 h-6 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-xl p-6 mb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="mb-1">{meal.restaurant}</div>
              <div className="text-sm text-gray-600">{meal.location.address}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <NavigationIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Distance</div>
                <div>{meal.location.distance}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">ETA</div>
                <div>{meal.location.estimatedTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <NavigationIcon className="w-5 h-5 mr-2" />
            Start Navigation
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <Phone className="w-5 h-5 mr-2" />
            Call Restaurant
          </Button>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-sm text-blue-800">
            💡 Tip: Call ahead to ensure availability and confirm pickup time for your {meal.name}!
          </div>
        </div>
      </div>
    </div>
  );
}
