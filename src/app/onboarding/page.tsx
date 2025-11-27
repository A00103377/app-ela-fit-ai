'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/lib/database-actions';
import { useAuth } from '@/components/providers/auth-provider';
import { Sparkles } from 'lucide-react';
import { UserProfile } from '@/lib/types';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: 25,
    weight: 60,
    height: 165,
    fitnessLevel: 'iniciante' as const,
    goals: [] as string[],
    restrictions: [] as string[],
    trainingLocation: 'academia' as const,
    weeklyAvailability: 3,
    preferredDuration: 45,
  });

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await createProfile(user.id, formData as any);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      alert('Erro ao criar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">Passo {step} de 3</span>
            <span className="text-sm font-medium text-[#C75B7A]">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vinda! 💜</h2>
              <p className="text-gray-600">Vamos conhecer você melhor para criar treinos perfeitos</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seu nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Como você gostaria de ser chamada?"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Seus Objetivos 🎯</h2>
              <p className="text-gray-600">Selecione um ou mais objetivos</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'emagrecimento', label: 'Emagrecimento', emoji: '🔥' },
                { value: 'hipertrofia', label: 'Hipertrofia', emoji: '💪' },
                { value: 'definicao', label: 'Definição', emoji: '✨' },
                { value: 'tonificacao', label: 'Tonificação', emoji: '🎯' },
                { value: 'saude', label: 'Saúde', emoji: '❤️' },
                { value: 'bem-estar', label: 'Bem-estar', emoji: '🧘‍♀️' },
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => toggleGoal(goal.value)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.goals.includes(goal.value)
                      ? 'border-[#C75B7A] bg-pink-50'
                      : 'border-gray-200 hover:border-[#C75B7A] hover:bg-pink-50'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{goal.emoji}</span>
                  <span className="font-medium text-gray-900">{goal.label}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nível de condicionamento</label>
              <select 
                value={formData.fitnessLevel}
                onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediaria">Intermediária</option>
                <option value="avancada">Avançada</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={formData.goals.length === 0}
                className="flex-1 bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quase lá! 🚀</h2>
              <p className="text-gray-600">Últimas informações para personalizar seus treinos</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Onde você treina?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'academia', label: 'Academia' },
                  { value: 'casa', label: 'Casa' },
                  { value: 'ao-ar-livre', label: 'Ao ar livre' }
                ].map((local) => (
                  <button
                    key={local.value}
                    onClick={() => setFormData({ ...formData, trainingLocation: local.value as any })}
                    className={`p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                      formData.trainingLocation === local.value
                        ? 'border-[#C75B7A] bg-pink-50'
                        : 'border-gray-200 hover:border-[#C75B7A] hover:bg-pink-50'
                    }`}
                  >
                    {local.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dias por semana</label>
                <select 
                  value={formData.weeklyAvailability}
                  onChange={(e) => setFormData({ ...formData, weeklyAvailability: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
                >
                  <option value={3}>3 dias</option>
                  <option value={4}>4 dias</option>
                  <option value={5}>5 dias</option>
                  <option value={6}>6 dias</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duração (min)</label>
                <select 
                  value={formData.preferredDuration}
                  onChange={(e) => setFormData({ ...formData, preferredDuration: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors"
                >
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar Meu Treino! ✨'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
