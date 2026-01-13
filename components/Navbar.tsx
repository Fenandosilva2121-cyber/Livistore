
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin, Bell, User as UserIcon, LogOut, ChevronDown, Store } from 'lucide-react';
import { View, User } from '../types';

interface NavbarProps {
  onNavigate: (view: View) => void;
  onSearch: (query: string) => void;
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onSearch, cartCount, user, onLogout }) => {
  const [query, setQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="bg-[#FF6600] pt-2 pb-2 px-2 md:px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Top Row: Logo, Icons (Mobile First) */}
        <div className="flex items-center justify-between gap-2 md:gap-12">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer select-none shrink-0"
            onClick={() => onNavigate('home')}
          >
            <span className="text-white font-black text-xl md:text-2xl italic tracking-tighter">Livre</span>
            <span className="bg-white text-[#FF6600] px-1 rounded ml-0.5 font-bold text-base md:text-lg">Store</span>
          </div>

          {/* Search Bar - Hidden on very small screens, moved below or integrated */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex flex-1 bg-white rounded-sm items-center shadow-sm max-w-2xl"
          >
            <input 
              type="text" 
              placeholder="Buscar em Imperatriz..." 
              className="w-full px-4 py-2 outline-none text-sm text-gray-700 rounded-l-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="px-3 border-l border-gray-200 text-gray-400 hover:text-[#FF6600]">
              <Search size={20} />
            </button>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-3 md:gap-6 text-white text-xs font-medium">
            {user ? (
              <div className="relative">
                <div 
                  className="flex items-center gap-1 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <UserIcon size={20} className="md:w-[18px]" />
                  <span className="hidden md:inline max-w-[100px] truncate font-semibold">Olá, {user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`hidden md:inline transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </div>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded shadow-2xl py-2 z-50 border border-gray-100 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Sua Conta</p>
                        <p className="text-xs text-gray-800 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { onNavigate('orders'); setShowUserMenu(false); }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        Meus Pedidos
                      </button>
                      <button 
                        onClick={() => { onNavigate('dashboard-seller'); setShowUserMenu(false); }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Store size={16} className="text-[#FF6600]" /> Painel Vendedor
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={() => { onLogout(); setShowUserMenu(false); }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} /> Sair
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="hover:bg-white/10 p-1 rounded transition-colors"
              >
                <UserIcon size={20} />
              </button>
            )}
            
            <button className="relative hover:bg-white/10 p-1 rounded transition-colors" onClick={() => onNavigate('cart')}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only on Mobile) */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex sm:hidden w-full bg-white rounded-sm items-center shadow-sm"
        >
          <input 
            type="text" 
            placeholder="O que você procura em ITZ?" 
            className="w-full px-3 py-1.5 outline-none text-sm text-gray-700 rounded-l-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="px-3 text-gray-400">
            <Search size={18} />
          </button>
        </form>

        {/* Bottom Row: Address & Navigation Links */}
        <div className="flex items-center justify-between text-white text-[10px] md:text-sm font-light mt-1 overflow-x-auto no-scrollbar whitespace-nowrap gap-4">
          <div className="flex items-center gap-1 text-white/80 cursor-pointer hover:text-white transition-colors shrink-0">
            <MapPin size={14} className="md:w-4" />
            <span className="truncate max-w-[150px] md:max-w-none">
              {user ? user.address.split(',')[0] : 'Imperatriz, MA'}
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-8 font-normal">
            <span className="cursor-pointer hover:text-white/80" onClick={() => onNavigate('home')}>Início</span>
            <span className="cursor-pointer hover:text-white/80">Ofertas</span>
            {user && (
              <span className="cursor-pointer hover:text-white/80" onClick={() => onNavigate('dashboard-seller')}>Meu Painel</span>
            )}
            <button 
              className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold transition-all ${
                user 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-white/10 text-white/60'
              }`}
              onClick={() => onNavigate('sell')}
            >
              <Store size={12} />
              <span>Vender</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
