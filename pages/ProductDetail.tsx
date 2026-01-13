
import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { Star, ShieldCheck, Trophy, Truck, Zap, MessageSquare, Send, Loader2 } from 'lucide-react';
import { chatWithSellerAI } from '../services/geminiService';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onGoBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onGoBack }) => {
  const [userMsg, setUserMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const currentMsg = userMsg;
    setUserMsg('');
    setChatHistory(prev => [...prev, { role: 'user', content: currentMsg }]);
    setIsTyping(true);

    try {
      const response = await chatWithSellerAI(
        product.title, 
        currentMsg, 
        chatHistory.map(h => ({ role: h.role, parts: [{ text: h.content }] }))
      );
      setChatHistory(prev => [...prev, { role: 'model', content: response || 'Desculpe, não consegui processar sua dúvida.' }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'model', content: 'Erro ao conectar com o vendedor.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={onGoBack}
        className="text-blue-500 text-sm font-medium mb-6 hover:underline"
      >
        Voltar para a lista
      </button>

      <div className="bg-white rounded p-4 lg:p-12 mercado-shadow flex flex-col lg:flex-row gap-12">
        {/* Left: Images */}
        <div className="flex-1">
          <div className="sticky top-24 space-y-4">
            <div className="border border-gray-100 rounded overflow-hidden aspect-square">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-20 border border-gray-200 rounded cursor-pointer hover:border-[#FF6600] transition-colors p-1">
                  <img src={`https://picsum.photos/seed/${product.id}-${i}/100/100`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* AI Assistant - Chat with Seller */}
            <div className="mt-12 border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[400px]">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <MessageSquare size={20} className="text-[#FF6600]" />
                <span className="font-bold text-gray-700">Dúvidas? Pergunte ao Vendedor (IA)</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {chatHistory.length === 0 && (
                  <p className="text-center text-gray-400 text-sm mt-10">Tire suas dúvidas sobre o produto agora mesmo!</p>
                )}
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      chat.role === 'user' 
                      ? 'bg-[#FF6600] text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                    }`}>
                      {chat.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-400 border border-gray-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Vendedor digitando...
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex gap-2">
                <input 
                  type="text" 
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  placeholder="Escreva sua pergunta..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
                <button 
                  type="submit"
                  disabled={!userMsg.trim() || isTyping}
                  className="bg-[#FF6600] text-white p-2 rounded disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          <div className="space-y-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">{product.condition === 'new' ? 'Novo' : 'Usado'}</span>
            <h1 className="text-2xl font-bold leading-tight text-gray-800">{product.title}</h1>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={16} fill={i <= Math.floor(product.rating) ? '#FF6600' : 'none'} className={i <= Math.floor(product.rating) ? 'text-[#FF6600]' : 'text-gray-300'} />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewsCount} opiniões)</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light text-gray-900 leading-none">R$ {Math.floor(product.price).toLocaleString('pt-BR')}</span>
              <span className="text-xl font-light text-gray-900">
                {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm text-gray-700">em <span className="text-green-600 font-medium">10x R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros</span></p>
            <p className="text-xs text-blue-500 hover:underline cursor-pointer">Ver os meios de pagamento</p>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4 py-6 border-y border-gray-100">
            <div className="flex gap-3">
              <Truck size={20} className="text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Envio grátis para todo o país</p>
                <p className="text-xs text-gray-500 mt-0.5">Saiba os prazos de entrega e formas de envio.</p>
                <p className="text-xs text-blue-500 hover:underline cursor-pointer mt-1">Calcular prazo de entrega</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <ShieldCheck size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-800">Compra Garantida, receba o produto que está esperando ou devolvemos o dinheiro.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Trophy size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-800">Mercado Pontos. Você acumula <span className="font-bold">{(product.price / 10).toFixed(0)} pontos</span>.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-medium text-gray-800">Estoque disponível</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Quantidade:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                <option>1 unidade</option>
                <option>2 unidades</option>
                <option>3 unidades</option>
                <option>Mais de 3</option>
              </select>
              <span className="text-xs text-gray-400">(999 disponíveis)</span>
            </div>

            <button className="w-full bg-[#3483FA] text-white py-3 rounded font-bold hover:bg-[#2968c8] transition-colors mt-4">
              Comprar agora
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-[#3483FA]/10 text-[#3483FA] py-3 rounded font-bold hover:bg-[#3483FA]/20 transition-colors"
            >
              Adicionar ao carrinho
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-2">Informações sobre o vendedor</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-1 border-t-4 border-red-500"></div>
              <div className="w-10 h-1 border-t-4 border-orange-400"></div>
              <div className="w-10 h-1 border-t-4 border-yellow-300"></div>
              <div className="w-10 h-1 border-t-4 border-green-400"></div>
              <div className="w-10 h-1 border-t-4 border-green-600"></div>
            </div>
            <p className="text-xs text-gray-500">Este vendedor é um dos melhores do site!</p>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="bg-white rounded mt-4 p-8 lg:p-12 mercado-shadow">
        <h2 className="text-2xl text-gray-800 mb-8 font-light">Descrição</h2>
        <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg font-light">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
