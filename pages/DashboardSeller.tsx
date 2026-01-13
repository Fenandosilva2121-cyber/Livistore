
import React from 'react';
import { Product } from '../types';
import { LayoutDashboard, Package, DollarSign, Users, PlusCircle, ExternalLink } from 'lucide-react';

interface DashboardSellerProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (p: Product) => void;
}

const DashboardSeller: React.FC<DashboardSellerProps> = ({ products, onAddProduct, onEditProduct }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <div className="bg-white p-4 rounded mercado-shadow space-y-4">
          <div className="flex items-center gap-3 text-[#FF6600]">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Painel</p>
              <p className="text-sm font-bold text-gray-800">Vendedor ITZ</p>
            </div>
          </div>
          <nav className="flex md:flex-col overflow-x-auto no-scrollbar md:overflow-visible gap-1 pb-2 md:pb-0">
            <button className="min-w-fit px-3 py-2 text-xs md:text-sm rounded bg-gray-50 font-bold text-[#FF6600]">Vendas</button>
            <button className="min-w-fit px-3 py-2 text-xs md:text-sm rounded hover:bg-gray-50 text-gray-600">Anúncios</button>
            <button className="min-w-fit px-3 py-2 text-xs md:text-sm rounded hover:bg-gray-50 text-gray-600">Mensagens</button>
            <button className="min-w-fit px-3 py-2 text-xs md:text-sm rounded hover:bg-gray-50 text-gray-600">Reputação</button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 md:p-6 rounded mercado-shadow border-b-4 border-green-500">
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <DollarSign className="text-gray-400" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase">Receita</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">R$ 12.450,00</p>
            <p className="text-[10px] text-green-600 mt-1 md:mt-2 font-medium">+15% este mês</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded mercado-shadow border-b-4 border-blue-500">
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <Package className="text-gray-400" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase">Vendas Ativas</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">42</p>
            <p className="text-[10px] text-blue-600 mt-1 md:mt-2 font-medium">12 enviadas hoje</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded mercado-shadow border-b-4 border-purple-500">
            <div className="flex justify-between items-start mb-2 md:mb-4">
              <Users className="text-gray-400" size={20} />
              <span className="text-[10px] font-bold text-gray-400 uppercase">Cliques</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">1.280</p>
            <p className="text-[10px] text-purple-600 mt-1 md:mt-2 font-medium">Público de ITZ</p>
          </div>
        </div>

        <div className="bg-white rounded mercado-shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-base md:text-lg font-bold text-gray-800 self-start">Seus Anúncios Locais</h2>
            <button 
              onClick={onAddProduct}
              className="w-full md:w-auto bg-[#FF6600] text-white px-4 py-2 rounded font-bold text-sm flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} /> Novo Anúncio
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase border-b">
                <tr>
                  <th className="px-6 py-3">Produto</th>
                  <th className="px-6 py-3">Preço</th>
                  <th className="px-6 py-3">Estoque</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">Você ainda não cadastrou produtos em Imperatriz.</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded object-cover border shrink-0" alt={p.title} />
                        <span className="text-sm font-medium text-gray-700 line-clamp-1">{p.title}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">R$ {p.price.toLocaleString('pt-BR')}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">12</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Ativo</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                           <button className="text-blue-500 p-1.5 hover:bg-blue-50 rounded transition-colors"><ExternalLink size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSeller;
