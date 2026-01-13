
import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (credentials: any) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-12 mb-20 px-4">
      <div className="bg-white rounded p-8 mercado-shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Entre na sua conta</h1>
        <p className="text-gray-500 text-sm text-center mb-8">Acesse suas compras e vendas em Imperatriz</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none transition-all"
                placeholder="Ex: joao@itz.com.br"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase">Senha</label>
              <button type="button" className="text-xs text-blue-500 hover:underline">Esqueci minha senha</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6600] outline-none transition-all"
                placeholder="Sua senha"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#3483FA] text-white py-3 rounded font-bold hover:bg-[#2968c8] transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600 mb-4">Novo por aqui?</p>
          <button 
            onClick={onSwitchToRegister}
            className="w-full border border-[#3483FA] text-[#3483FA] py-3 rounded font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            Criar conta grátis
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
