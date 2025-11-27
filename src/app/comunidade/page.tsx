'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import { Users, Trophy, Target, Heart, MessageCircle, Share2, Flame, TrendingUp } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  reward: string;
  progress: number;
  category: 'semanal' | 'mensal' | 'especial';
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

export default function ComunidadePage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'desafios' | 'grupos'>('feed');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Desafio 30 Dias de Treino',
      description: 'Complete 30 treinos consecutivos e ganhe uma medalha exclusiva!',
      duration: '30 dias',
      participants: 1247,
      reward: 'Medalha Guerreira 💪',
      progress: 65,
      category: 'mensal'
    },
    {
      id: '2',
      title: 'Semana do Cardio',
      description: 'Faça pelo menos 3 treinos de cardio esta semana',
      duration: '7 dias',
      participants: 856,
      reward: 'Badge Cardio Queen 👑',
      progress: 42,
      category: 'semanal'
    },
    {
      id: '3',
      title: 'Hidratação Perfeita',
      description: 'Beba 2L de água por dia durante 7 dias',
      duration: '7 dias',
      participants: 2103,
      reward: 'Badge Hidratação 💧',
      progress: 85,
      category: 'semanal'
    },
    {
      id: '4',
      title: 'Desafio Glúteos de Aço',
      description: 'Complete o programa especial de glúteos em 21 dias',
      duration: '21 dias',
      participants: 1589,
      reward: 'Medalha Glúteos de Aço 🍑',
      progress: 28,
      category: 'especial'
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: 'Juliana Santos',
      avatar: '👩🏻',
      content: 'Acabei de completar meu 50º treino! Nunca imaginei que conseguiria chegar tão longe. O ElaFit AI mudou minha vida! 💪✨',
      likes: 234,
      comments: 45,
      time: 'há 2 horas'
    },
    {
      id: '2',
      author: 'Mariana Costa',
      avatar: '👩🏽',
      content: 'Dica: adicionar música animada durante o treino faz TODA a diferença! Compartilho minha playlist favorita nos comentários 🎵',
      likes: 189,
      comments: 67,
      time: 'há 4 horas'
    },
    {
      id: '3',
      author: 'Camila Oliveira',
      avatar: '👩🏼',
      content: 'Perdi 5kg em 2 meses seguindo o plano nutricional da IA! Estou muito feliz com os resultados 🎉',
      likes: 412,
      comments: 89,
      time: 'há 6 horas'
    },
    {
      id: '4',
      author: 'Beatriz Lima',
      avatar: '👩🏾',
      content: 'Quem mais está no desafio dos 30 dias? Vamos juntas! 💜',
      likes: 156,
      comments: 34,
      time: 'há 8 horas'
    }
  ];

  return (
    <div className="min-h-screen pb-24 md:pt-20 bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comunidade ElaFit 💜
          </h1>
          <p className="text-gray-600">Conecte-se, inspire-se e conquiste junto com outras mulheres</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            value="12.5K"
            label="Membros"
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5" />}
            value="8.2K"
            label="Desafios"
            color="from-yellow-500 to-orange-500"
          />
          <StatCard
            icon={<Heart className="w-5 h-5" />}
            value="45K"
            label="Conquistas"
            color="from-red-500 to-pink-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
            icon={<MessageCircle className="w-4 h-4" />}
            label="Feed"
          />
          <TabButton
            active={activeTab === 'desafios'}
            onClick={() => setActiveTab('desafios')}
            icon={<Target className="w-4 h-4" />}
            label="Desafios"
          />
          <TabButton
            active={activeTab === 'grupos'}
            onClick={() => setActiveTab('grupos')}
            icon={<Users className="w-4 h-4" />}
            label="Grupos"
          />
        </div>

        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Nova Postagem */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <textarea
                placeholder="Compartilhe sua conquista, dica ou motivação... 💪"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C75B7A] focus:outline-none transition-colors resize-none"
                rows={3}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button className="bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Publicar
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{post.author}</h3>
                      <span className="text-sm text-gray-500">{post.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-100">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#C75B7A] transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#C75B7A] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#C75B7A] transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desafios Tab */}
        {activeTab === 'desafios' && (
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {challenge.category === 'semanal' && '📅 Semanal'}
                      {challenge.category === 'mensal' && '📆 Mensal'}
                      {challenge.category === 'especial' && '⭐ Especial'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {challenge.participants.toLocaleString()} participantes
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        {challenge.reward}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Seu progresso</span>
                        <span className="font-bold text-[#C75B7A]">{challenge.progress}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] transition-all duration-500"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Participar do Desafio
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Grupos Tab */}
        {activeTab === 'grupos' && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Iniciantes Motivadas',
                members: 3421,
                description: 'Grupo para quem está começando a jornada fitness',
                icon: '🌱'
              },
              {
                name: 'Mães Fitness',
                members: 2156,
                description: 'Treino e maternidade juntos',
                icon: '👶'
              },
              {
                name: 'Hipertrofia Feminina',
                members: 4892,
                description: 'Foco em ganho de massa muscular',
                icon: '💪'
              },
              {
                name: 'Emagrecimento Saudável',
                members: 5234,
                description: 'Perca peso de forma saudável',
                icon: '🔥'
              },
              {
                name: 'Treino em Casa',
                members: 2987,
                description: 'Treinos eficientes sem academia',
                icon: '🏠'
              },
              {
                name: 'Nutrição e Receitas',
                members: 3765,
                description: 'Compartilhe receitas saudáveis',
                icon: '🥗'
              }
            ].map((group, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-6">
                <div className="text-4xl mb-4">{group.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{group.members.toLocaleString()} membros</span>
                  </div>
                  <button className="bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                    Participar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${color} text-white mb-2`}>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
        active
          ? 'bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
