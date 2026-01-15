import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { ArrowRight, User, Activity, DollarSign } from 'lucide-react';

interface OnboardingProps {
  onComplete: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  budget: number;
  dietPreference: string;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    activityLevel: 'moderate',
    budget: 30,
    dietPreference: 'balanced',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Create Account */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Step 1 of 3</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Input Body Data */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Step 2 of 3</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Height: {userData.height} cm</Label>
                <Slider
                  value={[userData.height]}
                  onValueChange={([value]) => setUserData({ ...userData, height: value })}
                  min={140}
                  max={220}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Weight: {userData.weight} kg</Label>
                <Slider
                  value={[userData.weight]}
                  onValueChange={([value]) => setUserData({ ...userData, weight: value })}
                  min={40}
                  max={150}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Activity Level</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['low', 'moderate', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setUserData({ ...userData, activityLevel: level })}
                      className={`p-3 rounded-lg border-2 capitalize transition-colors ${
                        userData.activityLevel === level
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Set Preferences/Budget */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Step 3 of 3</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Daily Budget: ${userData.budget}</Label>
                <Slider
                  value={[userData.budget]}
                  onValueChange={([value]) => setUserData({ ...userData, budget: value })}
                  min={10}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Diet Preference</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['balanced', 'low-carb', 'high-protein', 'vegetarian'].map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setUserData({ ...userData, dietPreference: diet })}
                      className={`p-3 rounded-lg border-2 capitalize transition-colors ${
                        userData.dietPreference === diet
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {diet.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleNext}
          className="w-full mt-8"
          disabled={step === 1 && !userData.name}
        >
          {step === 3 ? 'Get Started' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
