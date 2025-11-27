'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart, TrendingUp, Users, Dumbbell, Apple } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Personal Trainer de IA Exclusivo para Mulheres
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            ElaFit AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Treinos 100% personalizados criados por inteligência artificial para você alcançar seus objetivos com segurança e motivação
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/auth">
              <Button size="lg" variant="outline" className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-6 text-lg rounded-full">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher o ElaFit AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologia de ponta combinada com conhecimento especializado em fitness feminino
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-pink-100 hover:border-pink-300">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">IA Personalizada</h3>
            <p className="text-gray-600 leading-relaxed">
              Treinos criados especialmente para você com base em idade, peso, altura, objetivos e restrições físicas
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-purple-100 hover:border-purple-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Treinos Inteligentes</h3>
            <p className="text-gray-600 leading-relaxed">
              HIIT, funcional, musculação, mobilidade e cardio. Vídeos demonstrativos e alertas de postura correta
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-pink-100 hover:border-pink-300">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Acompanhamento</h3>
            <p className="text-gray-600 leading-relaxed">
              Gráficos de evolução, medidas corporais, peso, IMC, força e conquistas para manter você motivada
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-purple-100 hover:border-purple-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Apple className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Nutrição Inteligente</h3>
            <p className="text-gray-600 leading-relaxed">
              Sugestões de alimentação, receitas saudáveis e planos alimentares conforme seu objetivo
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-pink-100 hover:border-pink-300">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Comunidade</h3>
            <p className="text-gray-600 leading-relaxed">
              Grupos motivacionais, desafios semanais e fórum seguro para trocas e dicas entre mulheres
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-purple-100 hover:border-purple-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Feito para Você</h3>
            <p className="text-gray-600 leading-relaxed">
              Linguagem acolhedora, motivacional e feminina. Um espaço seguro para sua jornada fitness
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronta para transformar sua vida?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de mulheres que já estão alcançando seus objetivos com o ElaFit AI
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all font-bold">
              Começar Minha Jornada
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium mb-2">ElaFit AI - Personal Trainer Inteligente</p>
          <p className="text-sm">Treinos personalizados feitos especialmente para mulheres</p>
        </div>
      </footer>
    </div>
  );
}
