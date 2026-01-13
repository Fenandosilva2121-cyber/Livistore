
import React from 'react';
import { Order, OrderStatus } from '../types';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';

interface OrdersProps {
  orders: Order[];
}

const statusMap: Record<OrderStatus, { label: string, color: string, icon: any }> = {
  pending: { label: 'Pagamento Pendente', color: 'text-orange-500', icon: Clock },
  preparing: { label: 'Preparando Entrega', color: 'text-blue-500', icon: Package },
  shipped: { label: 'A caminho (Motoboy)', color: 'text-purple-500', icon: Truck },
  delivered: { label: 'Entregue', color: 'text-green-600', icon: CheckCircle2 },
  cancelled: { label: 'Cancelado', color: 'text-red-500', icon: Clock },
};

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Minhas Compras</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded mercado-shadow text-center">
          <p className="text-gray-500">Você ainda não realizou compras em Imperatriz.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const StatusIcon = statusMap[order.status].icon;
            return (
              <div key={order.id} className="bg-white rounded mercado-shadow overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400">PEDIDO #{order.id}</span>
                  <span className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <img src={item.image} className="w-12 h-12 rounded object-cover border" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.quantity} un.</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full md:w-64 border-l border-gray-100 pl-0 md:pl-6 space-y-4">
                      <div className={`flex items-center gap-2 ${statusMap[order.status].color} font-bold text-sm`}>
                        <StatusIcon size={18} />
                        {statusMap[order.status].label}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase">Destino</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin size={12} /> {order.address}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase">Logística Local</p>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-1000" 
                            style={{ 
                              width: order.status === 'delivered' ? '100%' : 
                                     order.status === 'shipped' ? '70%' : 
                                     order.status === 'preparing' ? '30%' : '10%' 
                            }}
                          ></div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {order.status === 'delivered' ? 'Produto entregue com sucesso' : 'Previsão de entrega: Hoje'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                  <button className="text-xs text-blue-500 font-bold hover:underline">VER DETALHES</button>
                  <span className="text-sm font-bold text-gray-900">Total: R$ {order.total.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
