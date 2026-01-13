
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Sell from './pages/Sell';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import DashboardSeller from './pages/DashboardSeller';
import { Product, CartItem, View, User, Order } from './types';
import { MOCK_PRODUCTS } from './constants';
import { Home as HomeIcon, Search as SearchIcon, PlusSquare, ShoppingBag, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // App States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  const handleNavigate = (view: View) => {
    // Protection: Only allow Sell or Dashboard if logged in
    if ((view === 'sell' || view === 'dashboard-seller' || view === 'checkout') && !currentUser) {
      setCurrentView('register');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    handleNavigate('cart');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id: string, qty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRegister = (userData: any) => {
    setCurrentUser({ ...userData, id: 'u' + Date.now() });
    handleNavigate('home');
  };

  const handleLogin = (credentials: any) => {
    setCurrentUser({
      id: 'u-123',
      name: 'Usuário ITZ',
      email: credentials.email,
      address: 'Centro, Imperatriz - MA',
      phone: '(99) 99123-4567'
    });
    handleNavigate('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };

  const handleAddProduct = (product: Product) => {
    setMyProducts([product, ...myProducts]);
    handleNavigate('dashboard-seller');
  };

  const handleFinishCheckout = (orderData: any) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'preparing',
      trackingNumber: 'ITZ' + Date.now()
    };
    setMyOrders([newOrder, ...myOrders]);
    setCart([]);
    handleNavigate('orders');
  };

  const allProducts = [...myProducts, ...MOCK_PRODUCTS];

  const filteredProducts = allProducts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#ebebeb] pb-16 md:pb-0">
      <Navbar 
        onNavigate={handleNavigate} 
        onSearch={handleSearch}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        user={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <Home onProductClick={handleProductClick} products={allProducts} />
        )}

        {currentView === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart}
            onGoBack={() => handleNavigate('home')}
          />
        )}

        {currentView === 'cart' && (
          <Cart 
            items={cart} 
            onRemove={removeFromCart} 
            onUpdateQty={updateCartQty}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentView === 'sell' && currentUser && (
          <Sell onAddProduct={handleAddProduct} />
        )}

        {currentView === 'register' && (
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => handleNavigate('login')} 
          />
        )}

        {currentView === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => handleNavigate('register')} 
          />
        )}

        {currentView === 'checkout' && currentUser && (
          <Checkout 
            items={cart} 
            user={currentUser} 
            onFinish={handleFinishCheckout} 
          />
        )}

        {currentView === 'orders' && (
          <Orders orders={myOrders} />
        )}

        {currentView === 'dashboard-seller' && currentUser && (
          <DashboardSeller 
            products={myProducts} 
            onAddProduct={() => handleNavigate('sell')}
            onEditProduct={() => {}}
          />
        )}

        {currentView === 'search' && (
          <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
            <h2 className="text-sm md:text-xl text-gray-600 mb-4 md:mb-6">Resultados em ITZ para: <span className="font-bold text-gray-800">{searchQuery}</span></h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                {filteredProducts.map(p => (
                  <ProductDetailCard key={p.id} product={p} onClick={handleProductClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded mercado-shadow">
                <p className="text-gray-500">Nenhum produto local encontrado.</p>
                <button onClick={() => handleNavigate('home')} className="mt-4 text-blue-500 hover:underline">Voltar para o início</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action for Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 md:hidden flex items-center justify-around z-50 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => handleNavigate('home')} className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-[#FF6600]' : 'text-gray-400'}`}>
          <HomeIcon size={22} />
          <span className="text-[9px] font-bold">Início</span>
        </button>
        <button onClick={() => { setSearchQuery(''); handleNavigate('search'); }} className={`flex flex-col items-center gap-1 ${currentView === 'search' ? 'text-[#FF6600]' : 'text-gray-400'}`}>
          <SearchIcon size={22} />
          <span className="text-[9px] font-bold">Buscar</span>
        </button>
        <button onClick={() => handleNavigate('sell')} className={`flex flex-col items-center gap-1 ${currentView === 'sell' ? 'text-[#FF6600]' : 'text-gray-400'}`}>
          <PlusSquare size={22} />
          <span className="text-[9px] font-bold">Vender</span>
        </button>
        <button onClick={() => handleNavigate('orders')} className={`flex flex-col items-center gap-1 ${currentView === 'orders' ? 'text-[#FF6600]' : 'text-gray-400'}`}>
          <ShoppingBag size={22} />
          <span className="text-[9px] font-bold">Compras</span>
        </button>
        <button onClick={() => handleNavigate(currentUser ? 'dashboard-seller' : 'login')} className={`flex flex-col items-center gap-1 ${currentView === 'login' || currentView === 'dashboard-seller' ? 'text-[#FF6600]' : 'text-gray-400'}`}>
          <UserIcon size={22} />
          <span className="text-[9px] font-bold">{currentUser ? 'Painel' : 'Entrar'}</span>
        </button>
      </div>

      <footer className="hidden md:block bg-white border-t border-gray-200 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-xs text-gray-500">
          <div className="space-y-4">
            <p className="font-bold text-gray-800">Sua Conta</p>
            <p className="cursor-pointer hover:underline" onClick={() => handleNavigate('orders')}>Minhas compras</p>
            <p className="cursor-pointer hover:underline" onClick={() => handleNavigate('dashboard-seller')}>Vendas (Painel)</p>
            <p className="cursor-pointer hover:underline" onClick={() => handleNavigate('register')}>Cadastrar-se</p>
          </div>
          <div className="max-w-md">
            <p className="mb-4 font-bold text-gray-700 uppercase tracking-wider">LivreStore Imperatriz-MA</p>
            <p className="mb-4">Copyright © 2024 LivreStore Imperatriz LTDA.</p>
            <p>Empresa do grupo Maranhão Digital. Av. Getúlio Vargas, Centro, ITZ.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductDetailCard: React.FC<{product: Product, onClick: (p: Product) => void}> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded overflow-hidden mercado-shadow h-full cursor-pointer hover:scale-[1.02] transition-transform flex flex-col"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square bg-gray-50 overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
      </div>
      <div className="p-2 md:p-3 flex flex-col flex-1">
        <h3 className="text-[10px] md:text-xs text-gray-600 line-clamp-2 h-6 md:h-8 mb-1 md:mb-2">{product.title}</h3>
        <p className="text-sm md:text-lg font-bold">R$ {product.price.toLocaleString('pt-BR')}</p>
        <p className="text-[8px] md:text-[10px] text-green-600 font-bold italic mt-auto">
          {product.freeShipping && 'Frete Grátis em ITZ'}
        </p>
      </div>
    </div>
  );
};

export default App;
