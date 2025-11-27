'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, TrendingUp, User, BookOpen, Apple, Users } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Início' },
    { href: '/treino', icon: Dumbbell, label: 'Treino' },
    { href: '/exercicios', icon: BookOpen, label: 'Exercícios' },
    { href: '/nutricao', icon: Apple, label: 'Nutrição' },
    { href: '/comunidade', icon: Users, label: 'Comunidade' },
    { href: '/progresso', icon: TrendingUp, label: 'Progresso' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C75B7A] to-[#9B4D6B] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold text-gray-900">ElaFit AI</span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C75B7A] to-[#9B4D6B] text-white'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
