
import React from 'react';
import { Product } from '../types';
import { Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded border border-transparent overflow-hidden mercado-shadow mercado-shadow-hover transition-all cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isFlashDeal && (
          <div className="absolute top-2 left-2 bg-[#FF6600] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
            <Zap size={10} fill="currentColor" /> OFERTA DO DIA
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-gray-700 text-sm font-light leading-snug line-clamp-2 mb-2 group-hover:text-[#FF6600] transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-normal text-gray-900 leading-none">
              R$ {Math.floor(product.price).toLocaleString('pt-BR')}
            </span>
            <span className="text-xs font-normal text-gray-900">
              {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
            </span>
          </div>
          
          <div className="text-xs text-green-600 font-medium mt-1">
            10x R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros
          </div>

          <div className="flex items-center gap-1 mt-2">
            {product.freeShipping && (
              <span className="text-[11px] font-bold text-green-600 italic">Frete grátis</span>
            )}
            {product.fullDelivery && (
              <span className="text-[11px] font-black text-green-600 italic flex items-center gap-0.5">
                <Zap size={12} className="fill-current" /> FULL
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
