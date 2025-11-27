import { UserProfile } from './types';

export interface Meal {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
}

export interface NutritionPlan {
  name: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  meals: Meal[];
  tips: string[];
}

export interface Recipe {
  id: string;
  name: string;
  category: 'cafe' | 'almoco' | 'jantar' | 'lanche' | 'sobremesa';
  prepTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  image?: string;
}

export class NutritionAI {
  static generateNutritionPlan(profile: UserProfile): NutritionPlan {
    // Cálculo de TMB (Taxa Metabólica Basal) - Fórmula de Harris-Benedict
    const tmb = 655 + (9.6 * profile.weight) + (1.8 * profile.height) - (4.7 * profile.age);
    
    // Ajuste baseado no objetivo
    let calorieMultiplier = 1.2; // Sedentário
    if (profile.weeklyAvailability >= 3) calorieMultiplier = 1.55; // Moderado
    if (profile.weeklyAvailability >= 5) calorieMultiplier = 1.725; // Ativo
    
    let dailyCalories = Math.round(tmb * calorieMultiplier);
    
    // Ajuste baseado nos objetivos
    if (profile.goals.includes('emagrecimento')) {
      dailyCalories -= 500; // Déficit calórico
    } else if (profile.goals.includes('hipertrofia')) {
      dailyCalories += 300; // Superávit calórico
    }

    // Distribuição de macronutrientes
    const proteinPerKg = profile.goals.includes('hipertrofia') ? 2.0 : 1.6;
    const dailyProtein = Math.round(profile.weight * proteinPerKg);
    const dailyFats = Math.round((dailyCalories * 0.25) / 9);
    const dailyCarbs = Math.round((dailyCalories - (dailyProtein * 4) - (dailyFats * 9)) / 4);

    const meals: Meal[] = [
      {
        name: 'Café da Manhã',
        time: '07:00',
        calories: Math.round(dailyCalories * 0.25),
        protein: Math.round(dailyProtein * 0.25),
        carbs: Math.round(dailyCarbs * 0.30),
        fats: Math.round(dailyFats * 0.25),
        foods: [
          '2 ovos mexidos',
          '2 fatias de pão integral',
          '1 banana',
          'Café com leite desnatado'
        ]
      },
      {
        name: 'Lanche da Manhã',
        time: '10:00',
        calories: Math.round(dailyCalories * 0.10),
        protein: Math.round(dailyProtein * 0.15),
        carbs: Math.round(dailyCarbs * 0.15),
        fats: Math.round(dailyFats * 0.10),
        foods: [
          '1 iogurte grego',
          '1 porção de frutas vermelhas',
          '1 colher de granola'
        ]
      },
      {
        name: 'Almoço',
        time: '12:30',
        calories: Math.round(dailyCalories * 0.35),
        protein: Math.round(dailyProtein * 0.35),
        carbs: Math.round(dailyCarbs * 0.35),
        fats: Math.round(dailyFats * 0.30),
        foods: [
          '150g de frango grelhado',
          '4 colheres de arroz integral',
          'Salada verde à vontade',
          '2 colheres de feijão',
          '1 colher de azeite'
        ]
      },
      {
        name: 'Lanche da Tarde',
        time: '16:00',
        calories: Math.round(dailyCalories * 0.10),
        protein: Math.round(dailyProtein * 0.15),
        carbs: Math.round(dailyCarbs * 0.10),
        fats: Math.round(dailyFats * 0.15),
        foods: [
          '1 shake de whey protein',
          '1 maçã',
          '10 amêndoas'
        ]
      },
      {
        name: 'Jantar',
        time: '19:30',
        calories: Math.round(dailyCalories * 0.20),
        protein: Math.round(dailyProtein * 0.10),
        carbs: Math.round(dailyCarbs * 0.10),
        fats: Math.round(dailyFats * 0.20),
        foods: [
          '120g de peixe grelhado',
          'Legumes refogados',
          'Salada verde',
          '1 batata doce pequena'
        ]
      }
    ];

    const tips = [
      '💧 Beba pelo menos 2-3 litros de água por dia',
      '🥗 Priorize alimentos naturais e minimamente processados',
      '⏰ Mantenha horários regulares para as refeições',
      '🍎 Inclua frutas e vegetais em todas as refeições',
      '💪 Consuma proteína em todas as refeições para manter a massa muscular',
      '🚫 Evite açúcares refinados e alimentos ultraprocessados',
      '😴 Durma bem - o sono é essencial para resultados',
      '📊 Monitore seu progresso semanalmente'
    ];

    return {
      name: 'Plano Nutricional Personalizado',
      dailyCalories,
      dailyProtein,
      dailyCarbs,
      dailyFats,
      meals,
      tips
    };
  }

  static getRecipes(): Recipe[] {
    return [
      {
        id: '1',
        name: 'Omelete Proteica',
        category: 'cafe',
        prepTime: 10,
        servings: 1,
        calories: 320,
        protein: 28,
        carbs: 8,
        fats: 20,
        ingredients: [
          '3 ovos',
          '50g de queijo cottage',
          '1 tomate picado',
          'Temperos a gosto',
          '1 colher de azeite'
        ],
        instructions: [
          'Bata os ovos em uma tigela',
          'Adicione o queijo cottage e o tomate',
          'Tempere a gosto',
          'Aqueça uma frigideira com azeite',
          'Despeje a mistura e cozinhe em fogo médio',
          'Dobre ao meio quando estiver firme'
        ],
        tips: [
          'Adicione espinafre para mais nutrientes',
          'Sirva com pão integral'
        ]
      },
      {
        id: '2',
        name: 'Frango Grelhado com Legumes',
        category: 'almoco',
        prepTime: 25,
        servings: 2,
        calories: 380,
        protein: 45,
        carbs: 22,
        fats: 12,
        ingredients: [
          '300g de peito de frango',
          '2 abobrinhas',
          '1 berinjela',
          '1 pimentão',
          'Temperos naturais',
          '2 colheres de azeite'
        ],
        instructions: [
          'Tempere o frango com sal, pimenta e ervas',
          'Grelhe o frango até dourar',
          'Corte os legumes em cubos',
          'Refogue os legumes com azeite',
          'Sirva o frango sobre os legumes'
        ],
        tips: [
          'Marinar o frango por 2 horas intensifica o sabor',
          'Adicione batata doce para mais carboidratos'
        ]
      },
      {
        id: '3',
        name: 'Salmão com Aspargos',
        category: 'jantar',
        prepTime: 20,
        servings: 2,
        calories: 420,
        protein: 38,
        carbs: 12,
        fats: 26,
        ingredients: [
          '2 filés de salmão (150g cada)',
          '1 maço de aspargos',
          'Suco de 1 limão',
          '2 colheres de azeite',
          'Alho e ervas'
        ],
        instructions: [
          'Tempere o salmão com limão, sal e pimenta',
          'Asse o salmão a 180°C por 15 minutos',
          'Refogue os aspargos com alho e azeite',
          'Sirva o salmão sobre os aspargos',
          'Finalize com limão'
        ],
        tips: [
          'Salmão é rico em ômega-3',
          'Não cozinhe demais para manter suculento'
        ]
      },
      {
        id: '4',
        name: 'Smoothie Proteico',
        category: 'lanche',
        prepTime: 5,
        servings: 1,
        calories: 280,
        protein: 32,
        carbs: 28,
        fats: 6,
        ingredients: [
          '1 scoop de whey protein',
          '1 banana',
          '1 xícara de leite desnatado',
          '1 colher de pasta de amendoim',
          'Gelo'
        ],
        instructions: [
          'Coloque todos os ingredientes no liquidificador',
          'Bata até ficar homogêneo',
          'Sirva imediatamente'
        ],
        tips: [
          'Adicione aveia para mais saciedade',
          'Use frutas congeladas para textura cremosa'
        ]
      },
      {
        id: '5',
        name: 'Panqueca de Banana Fit',
        category: 'cafe',
        prepTime: 15,
        servings: 2,
        calories: 240,
        protein: 18,
        carbs: 32,
        fats: 6,
        ingredients: [
          '2 bananas maduras',
          '2 ovos',
          '2 colheres de aveia',
          'Canela a gosto',
          'Mel para servir'
        ],
        instructions: [
          'Amasse as bananas em uma tigela',
          'Adicione os ovos e a aveia',
          'Misture bem até formar uma massa',
          'Cozinhe em frigideira antiaderente',
          'Sirva com mel'
        ],
        tips: [
          'Adicione whey protein para mais proteína',
          'Sirva com frutas vermelhas'
        ]
      },
      {
        id: '6',
        name: 'Salada Completa',
        category: 'almoco',
        prepTime: 15,
        servings: 2,
        calories: 350,
        protein: 28,
        carbs: 35,
        fats: 12,
        ingredients: [
          'Mix de folhas verdes',
          '150g de frango desfiado',
          '1 batata doce cozida',
          'Tomate cereja',
          'Pepino',
          'Azeite e limão'
        ],
        instructions: [
          'Lave e corte as folhas',
          'Adicione o frango desfiado',
          'Corte a batata doce em cubos',
          'Adicione tomate e pepino',
          'Tempere com azeite e limão'
        ],
        tips: [
          'Prepare o frango com antecedência',
          'Varie as proteínas: atum, ovos, queijo'
        ]
      }
    ];
  }

  static getRecipesByCategory(category: Recipe['category']): Recipe[] {
    return this.getRecipes().filter(r => r.category === category);
  }

  static calculateMealMacros(recipe: Recipe, servings: number) {
    return {
      calories: Math.round((recipe.calories / recipe.servings) * servings),
      protein: Math.round((recipe.protein / recipe.servings) * servings),
      carbs: Math.round((recipe.carbs / recipe.servings) * servings),
      fats: Math.round((recipe.fats / recipe.servings) * servings),
    };
  }
}
