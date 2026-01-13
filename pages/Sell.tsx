
import React, { useState, useRef } from 'react';
import { ImageIcon, Package, DollarSign, Tag, FileText, CheckCircle2, Truck } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

interface SellProps {
  onAddProduct: (product: Product) => void;
}

const Sell: React.FC<SellProps> = ({ onAddProduct }) => {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: CATEGORIES[0].name,
    condition: 'new' as 'new' | 'used',
    freeShipping: true
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const newProduct: Product = {
      id: 'lp-' + Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      condition: formData.condition,
      image: image || 'https://picsum.photos/seed/placeholder/400/400',
      rating: 5,
      reviewsCount: 0,
      freeShipping: formData.freeShipping,
      fullDelivery: false
    };

    onAddProduct(newProduct);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded p-8 mercado-shadow">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">Cadastrar novo produto em Imperatriz</h1>
          <p className="text-gray-500 text-sm mt-2">Preencha as informações abaixo para criar seu anúncio local.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Section */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Fotos do seu produto</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-video md:aspect-[3/1] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                image ? 'border-[#FF6600] bg-orange-50/20' : 'border-gray-200 hover:border-[#FF6600] bg-gray-50/50'
              }`}
            >
              {image ? (
                <div className="relative w-full h-full flex justify-center p-4">
                  <img src={image} className="h-full object-contain rounded" alt="Preview" />
                  <span className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#FF6600] shadow-sm">Alterar Foto</span>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                    <ImageIcon size={32} className="text-gray-300" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Clique para selecionar a imagem principal</span>
                </>
              )}
            </div>
            <input type="file" hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Título do Anúncio</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Samsung Galaxy S23 Ultra 256GB"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Preço (R$)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="number" 
                  required
                  step="0.01"
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none appearance-none bg-white"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Condition & Shipping */}
          <div className="flex flex-col md:flex-row gap-8 py-4 border-y border-gray-50">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase">Condição</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="condition" 
                    checked={formData.condition === 'new'} 
                    onChange={() => setFormData({...formData, condition: 'new'})} 
                    className="text-[#FF6600] focus:ring-[#FF6600]"
                  />
                  <span className="text-sm text-gray-700">Novo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="condition" 
                    checked={formData.condition === 'used'} 
                    onChange={() => setFormData({...formData, condition: 'used'})} 
                    className="text-[#FF6600] focus:ring-[#FF6600]"
                  />
                  <span className="text-sm text-gray-700">Usado</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase">Entrega em Imperatriz</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.freeShipping} 
                  onChange={e => setFormData({...formData, freeShipping: e.target.checked})} 
                  className="rounded text-[#FF6600] focus:ring-[#FF6600]"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  Oferecer Frete Grátis (Local) <Truck size={14} className="text-green-600" />
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Descrição detalhada</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea 
                rows={5}
                required
                placeholder="Descreva as características, estado de conservação, acessórios inclusos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-[#FF6600] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#e55c00] transition-colors shadow-lg"
            >
              <CheckCircle2 size={20} /> Publicar Anúncio Agora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
