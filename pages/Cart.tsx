
import React from 'react';
import { CartItem } from '../types';
import { Trash2, ShoppingBag, Truck } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onNavigateHome: () => void;
  onNavigateCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQty, onNavigateHome, onNavigateCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="bg-white p-8 rounded-full mercado-shadow mb-6">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8">Encontre produtos incríveis em Imperatriz agora mesmo!</p>
        <button 
          onClick={onNavigateHome}
          className="bg-[#3483FA] text-white px-8 py-3 rounded font-bold hover:bg-[#2968c8]"
        >
          Ir para o início
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho ({items.length})</h1>
        {items.map(item => (
          <div key={item.id} className="bg-white rounded p-4 mercado-shadow flex gap-4">
            <div className="w-24 h-24 border border-gray-100 rounded overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</h3>
              <div className="mt-2 flex items-center gap-4">
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-blue-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 size={14} /> Excluir
                </button>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Qtd:</span>
                  <select 
                    value={item.quantity}
                    onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-1 outline-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">R$ {(item.price * item.quantity).toLocaleString('pt-BR')}</p>
              {item.freeShipping && <p className="text-xs text-green-600 italic font-bold">Frete Grátis ITZ</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-80 space-y-4">
        <div className="bg-white rounded p-6 mercado-shadow space-y-6">
          <h2 className="text-lg font-bold border-b border-gray-100 pb-4">Resumo da compra</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Produtos ({items.length})</span>
              <span>R$ {subtotal.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Frete em Imperatriz</span>
              <span className="text-green-600 font-bold italic">Grátis</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded text-[10px] text-green-700">
              <Truck size={16} /> Você economiza no frete por ser em Imperatriz!
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl border-t border-gray-100 pt-4">
            <span>Total</span>
            <span>R$ {subtotal.toLocaleString('pt-BR')}</span>
          </div>
          <button 
            onClick={() => window.location.href = '#'} // This logic is handled in App.tsx but simplified here
            className="w-full bg-[#3483FA] text-white py-4 rounded font-bold text-lg hover:bg-[#2968c8]"
          >
            Fechar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
