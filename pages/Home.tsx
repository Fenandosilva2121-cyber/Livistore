
import React from 'react';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

interface HomeProps {
  onProductClick: (product: Product) => void;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ onProductClick, products }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 pb-12">
      {/* Hero Banner */}
      <div className="mt-3 md:mt-6 rounded-md overflow-hidden relative h-[180px] md:h-[400px] shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=400" 
          alt="Banner Comércio Local" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 to-transparent flex items-center px-6 md:px-12">
          <div className="text-white max-w-[200px] md:max-w-none">
            <h2 className="text-xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">VIVA IMPERATRIZ!</h2>
            <p className="text-xs md:text-xl mb-4 md:mb-6 font-light">As melhores ofertas da nossa região.</p>
            <button className="bg-white text-[#FF6600] px-4 md:px-8 py-2 md:py-3 rounded text-xs md:text-base font-bold hover:bg-orange-50 transition-all shadow-lg">
              VER OFERTAS
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Strip */}
      <div className="bg-white mt-3 md:mt-4 p-3 md:p-4 rounded shadow-sm flex items-center justify-between overflow-x-auto no-scrollbar gap-4 md:gap-8">
        <div className="flex items-center gap-2 md:gap-3 min-w-fit">
          <div className="p-1.5 md:p-2 rounded-full border border-gray-100 text-[#FF6600]"><ShoppingBag size={20} className="md:w-6" /></div>
          <div>
            <p className="text-[10px] md:text-sm font-medium leading-none">Retirada Local</p>
            <p className="text-[8px] md:text-xs text-blue-500 cursor-pointer">Ver pontos</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 min-w-fit">
          <div className="p-1.5 md:p-2 rounded-full border border-gray-100 text-[#FF6600]"><ShieldCheck size={20} className="md:w-6" /></div>
          <div>
            <p className="text-[10px] md:text-sm font-medium leading-none">Compra Segura</p>
            <p className="text-[8px] md:text-xs text-blue-500 cursor-pointer">Segurança ITZ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 min-w-fit">
          <div className="p-1.5 md:p-2 rounded-full border border-gray-100 text-[#FF6600]"><Truck size={20} className="md:w-6" /></div>
          <div>
            <p className="text-[10px] md:text-sm font-medium leading-none">Entrega Rápida</p>
            <p className="text-[8px] md:text-xs text-blue-500 cursor-pointer">Motoboy 24h</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 md:mt-10">
        <h2 className="text-lg md:text-2xl font-normal text-gray-600 mb-4 md:mb-6 px-1">Categorias populares</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="bg-white p-2 md:p-4 rounded mercado-shadow flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50/50 hover:border-orange-200 border border-transparent transition-all">
              <span className="text-xl md:text-3xl mb-1 md:mb-2">{cat.icon}</span>
              <span className="text-[9px] md:text-xs text-center font-medium text-gray-700 truncate w-full">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="mt-8 md:mt-12">
        <div className="flex items-baseline justify-between mb-4 md:mb-6 px-1">
          <h2 className="text-lg md:text-2xl font-normal text-gray-600">Novidades em ITZ</h2>
          <span className="text-blue-500 text-[10px] md:text-sm font-medium cursor-pointer hover:underline">Ver tudo</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {products.slice(0, 12).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick} 
            />
          ))}
        </div>
      </div>

      {/* Footer Banner (Imperatriz Style) */}
      <div className="mt-12 bg-white rounded-lg p-6 md:p-10 mercado-shadow border-l-4 border-[#FF6600] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">Venda agora mesmo!</h3>
          <p className="text-sm md:text-lg text-gray-600">Junte-se a centenas de vendedores locais e alcance toda Imperatriz.</p>
        </div>
        <button 
          className="bg-[#FF6600] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          QUERO VENDER
        </button>
      </div>
    </div>
  );
};

export default Home;
