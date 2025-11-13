import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, User, Menu, X, Search, Gift, Leaf, Clock } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

export default function CandleShop() {
  const [mobileOpen, setMobileOpen] = useState(false);
    const { texts } = useContext(LanguageContext);

  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-rose-300 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                S
              </div>
              <span className="font-semibold text-lg tracking-wide">СвечиТепла</span>
            </a>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#catalog" className="hover:text-amber-600 transition-colors">Каталог</a>
              <a href="#collections" className="hover:text-amber-600 transition-colors">Коллекции</a>
              <a href="#gifts" className="hover:text-amber-600 transition-colors">Подарки</a>
              <a href="#about" className="hover:text-amber-600 transition-colors">О нас</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 gap-2 w-[280px]">
                <Search size={16} className="text-gray-500" />
                <input placeholder="Поиск свечей..." className="bg-transparent outline-none text-sm w-full" />
              </div>

              <button className="hidden md:flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                <Heart size={18} className="text-gray-600" />
              </button>

              <a href="#cart" className="relative flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                <ShoppingCart size={18} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs px-1.5 rounded-full">3</span>
              </a>

              <button className="hidden md:flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                <User size={18} className="text-gray-700" />
              </button>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-100">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white/95">
            <div className="px-4 py-4 space-y-3">
              <a href="#catalog" className="block">Каталог</a>
              <a href="#collections" className="block">Коллекции</a>
              <a href="#gifts" className="block">Подарки</a>
              <a href="#about" className="block">О нас</a>

              <div className="pt-3 border-t">
                <input placeholder="Поиск..." className="w-full rounded-md border px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Натуральные свечи, созданные с любовью
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Ароматы, которые наполняют дом уютом. Экологичные ингредиенты, стильная упаковка и атмосфера, которую не спутать.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#catalog" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-semibold shadow">
                Купить сейчас
              </a>
              <a href="#collections" className="border border-gray-300 px-6 py-3 rounded-md hover:border-amber-600 hover:text-amber-600 font-medium">
                Смотреть коллекции
              </a>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Clock size={16} className="text-amber-600" /> До 60 часов горения</li>
              <li className="flex items-center gap-2"><Leaf size={16} className="text-amber-600" /> Натуральный воск</li>
              <li className="flex items-center gap-2"><Gift size={16} className="text-amber-600" /> Идеальный подарок</li>
            </ul>
          </div>

          {/* Product visual */}
          <div className="relative flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
              <img src="/candle-vanilla.jpg" alt="Свеча Ванильная луна" className="rounded-xl mb-4 object-cover w-full h-64" />
              <h3 className="font-semibold text-lg">Ванильная луна — 200 мл</h3>
              <p className="text-sm text-gray-600 mt-1">Тёплый ванильный аромат с нотами специй и карамели.</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold">₽1,490</span>
                <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                  <ShoppingCart size={18} /> В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <div className="bg-amber-100 py-3 text-sm text-center text-gray-700 border-t">
        Бесплатная доставка от ₽3,000 • 30-дневный возврат • Поддержка 24/7
      </div>
    </div>
  );
}
