import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  HomePage,
  CatalogPage,
  MyListingsPage,
  FavoritesPage,
  CartPage,
  CheckoutPage,
  ProfilePage,
  AddListingPage,
  ProductDetailPage,
  ChatPage,
  AiAssistant,
  Footer
} from './components';

// Global State Management
export const AppContext = React.createContext();

function App() {
  // Global state
  const [user, setUser] = useState({
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    balance: 125000,
    cryptoBalance: {
      BTC: 0.05,
      ETH: 2.3,
      USDT: 1500
    },
    isAuthenticated: true,
    rating: 4.8,
    reviewsCount: 23
  });

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Новое сообщение от продавца Tesla Model S', time: '5 мин назад', unread: true },
    { id: 2, text: 'Цена на iPhone 15 Pro снижена на 10%', time: '1 час назад', unread: true },
    { id: 3, text: 'Ваше объявление "MacBook Pro" просмотрели 15 раз', time: '2 часа назад', unread: false }
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setCart(savedCart);
    setFavorites(savedFavorites);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const contextValue = {
    user,
    setUser,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    favorites,
    toggleFavorite,
    notifications,
    setNotifications
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
              <Route path="/add-listing" element={<AddListingPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:userId" element={<ChatPage />} />
            </Routes>
          </main>
          <Footer />
          <AiAssistant />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;