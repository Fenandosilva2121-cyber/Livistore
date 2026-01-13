
import React, { useState } from 'react';
import { CartItem, User } from '../types';
import { CreditCard, Truck, ShieldCheck, MapPin, Zap } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  user: User | null;
  onFinish: (orderData: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, user, onFinish }) => {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('pix');
  
  const subtotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  const handleComplete = () => {
    onFinish({
      items,
      total: subtotal,
      paymentMethod: payment,
      address: user?.address || 'Imperatriz, MA',
      date: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        {/* Step 1: Address */}
        <div className={`bg-white rounded p-6 mercado-shadow ${step === 1 ? 'border-l-4 border-[#FF6600]' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MapPin size={20} className="text-[#FF6600]" /> 1. Endereço de Entrega
            </h2>
            {step > 1 && <button onClick={() => setStep(1)} className="text-xs text-blue-500">Alterar</button>}
          </div>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="p-4 border border-blue-100 bg-blue-50 rounded text-sm text-gray-700">
                <p className="font-bold">{user?.name || 'Visitante'}</p>
                <p>{user?.address || 'Imperatriz, MA - CEP 65900-000'}</p>
                <p>Centro - Imperatriz</p>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="bg-[#3483FA] text-white px-8 py-2 rounded font-bold text-sm"
              >
                Continuar
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{user?.address || 'Imperatriz, MA'}</p>
          )}
        </div>

        {/* Step 2: Payment */}
        <div className={`bg-white rounded p-6 mercado-shadow ${step === 2 ? 'border-l-4 border-[#FF6600]' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CreditCard size={20} className="text-[#FF6600]" /> 2. Método de Pagamento
            </h2>
            {step > 2 && <button onClick={() => setStep(2)} className="text-xs text-blue-500">Alterar</button>}
          </div>
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" checked={payment === 'pix'} onChange={() => setPayment('pix')} />
                  <div className="flex-1">
                    <p className="font-bold text-sm">PIX</p>
                    <p className="text-xs text-green-600 font-medium italic flex items-center gap-1">
                      <Zap size={12} fill="currentColor" /> Aprovação imediata
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input type="radio" checked={payment === 'card'} onChange={() => setPayment('card')} />
                  <div className="flex-1">
                    <p className="font-bold text-sm">Cartão de Crédito</p>
                    <p className="text-xs text-gray-500">Até 10x sem juros</p>
                  </div>
                </label>
              </div>
              <button 
                onClick={() => setStep(3)}
                className="bg-[#3483FA] text-white px-8 py-2 rounded font-bold text-sm"
              >
                Continuar
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Confirmation */}
        <div className={`bg-white rounded p-6 mercado-shadow ${step === 3 ? 'border-l-4 border-[#FF6600]' : ''}`}>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <ShieldCheck size={20} className="text-[#FF6600]" /> 3. Revisão e Confirmação
          </h2>
          {step === 3 && (
            <div className="space-y-4">
              <div className="divide-y divide-gray-100">
                {items.map(item => (
                  <div key={item.id} className="py-2 flex justify-between text-sm">
                    <span>{item.quantity}x {item.title}</span>
                    <span className="font-bold">R$ {(item.price * item.quantity).toLocaleString('pt-BR')}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleComplete}
                className="w-full bg-green-600 text-white py-4 rounded font-bold text-lg hover:bg-green-700"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-80">
        <div className="bg-white rounded p-6 mercado-shadow sticky top-24">
          <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Resumo da Compra</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Produtos</span>
              <span>R$ {subtotal.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Frete em ITZ</span>
              <span className="text-green-600 font-bold italic">Grátis</span>
            </div>
            <div className="pt-4 border-t flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>R$ {subtotal.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
