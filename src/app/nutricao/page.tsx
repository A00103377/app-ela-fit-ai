'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { Apple, Flame, Droplet, TrendingUp, ChefHat, Clock, Users } from 'lucide-react';
import { NutritionAI, NutritionPlan, Recipe } from '@/lib/nutrition-ai';
import { UserProfile } from '@/lib/types';

export default function NutricaoPage() {
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'cafe' | 'almoco' | 'jantar' | 'lanche'>('cafe');

  useEffect(() => {
    // Mock profile (em produção viria do banco)
    const mockProfile: UserProfile = {
      name: 'Ana',
      age: 28,
      weight: 65,
      height: 165,
      fitnessLevel: 'intermediaria',
      goals: ['tonificacao', 'definicao'],
      restrictions: [],
      trainingLocation: 'academia',
      weeklyAvailability: 4,
      preferredDuration: 45
    };

    const nutritionPlan = NutritionAI.generateNutritionPlan(mockProfile);
    setPlan(nutritionPlan);
    setRecipes(NutritionAI.getRecipes());
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C75B7A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Gerando seu plano nutricional...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pt-20 bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nutrição Inteligente 🥗
          </h1>
          <p className="text-gray-600">Plano alimentar personalizado para seus objetivos</p>
        </div>

        {/* Macros Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MacroCard
            icon={<Flame className="w-5 h-5" />}
            label="Calorias"
            value={`${plan.dailyCalories} kcal`}
            color="from-orange-500 to-red-500"
          />
          <MacroCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Proteínas"
            value={`${plan.dailyProtein}g`}
            color="from-blue-500 to-cyan-500"
          />
          <MacroCard
            icon={<Apple className="w-5 h-5" />}
            label="Carboidratos"
            value={`${plan.dailyCarbs}g`}
            color="from-green-500 to-emerald-500"
          />
          <MacroCard
            icon={<Droplet className="w-5 h-5" />}
            label="Gorduras"
            value={`${plan.dailyFats}g`}
            color="from-yellow-500 to-orange-500"
          />
        </div>

        {/* Plano Diário */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Plano Diário</h2>
          
          <div className="space-y-4">
            {plan.meals.map((meal, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#C75B7A] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#C75B7A]">{meal.calories} kcal</div>
                    <div className="text-xs text-gray-500">
                      P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fats}g
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {meal.foods.map((food, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-[#C75B7A] rounded-full"></div>
                      {food}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas Nutricionais */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Apple className="w-5 h-5 text-[#C75B7A]" />
            Dicas Nutricionais
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {plan.tips.map((tip, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-[#C75B7A] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Receitas Saudáveis */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-[#C75B7A]" />
              Receitas Saudáveis
            </h2>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: 'cafe', label: 'Café da Manhã' },
              { value: 'almoco', label: 'Almoço' },
              { value: 'jantar', label: 'Jantar' },
              { value: 'lanche', label: 'Lanches' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Lista de Receitas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes
              .filter(r => r.category === selectedCategory)
              .map((recipe) => (
                <div key={recipe.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#C75B7A] transition-all hover:shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{recipe.name}</h3>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings} porções
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Calorias:</span>
                        <span className="font-bold text-gray-900 ml-1">{recipe.calories}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Proteína:</span>
                        <span className="font-bold text-gray-900 ml-1">{recipe.protein}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Carbs:</span>
                        <span className="font-bold text-gray-900 ml-1">{recipe.carbs}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Gorduras:</span>
                        <span className="font-bold text-gray-900 ml-1">{recipe.fats}g</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                    Ver Receita Completa
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${color} text-white mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
