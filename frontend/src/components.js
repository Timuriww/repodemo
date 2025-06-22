import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AppContext } from './App';
import { EXTENDED_LISTINGS, CATEGORIES, PAYMENT_METHODS, CRYPTO_RATES } from './data';

// Header Component with Full Navigation
export const Header = () => {
  const navigate = useNavigate();
  const { user, cart, favorites, notifications } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MarketHub
            </div>
            <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
              AI-Powered
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров и услуг..."
                className={`w-full px-4 py-3 pl-12 pr-4 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Переключить тему"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
                </svg>
              )}
            </button>

            <Link to="/add-listing" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Подать объявление</span>
            </Link>

            <Link to="/my-listings" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Мои объявления
            </Link>

            <div className="relative">
              <Link to="/favorites" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>Избранное</span>
              </Link>
              {favorites.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </div>
              )}
            </div>

            <div className="relative">
              <Link to="/cart" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                </svg>
                <span>Корзина</span>
              </Link>
              {cartItemsCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11 19H6.5A3.5 3.5 0 0 1 3 15.5v-8A3.5 3.5 0 0 1 6.5 4h11A3.5 3.5 0 0 1 21 7.5v4"/>
                </svg>
              </button>
              {unreadNotifications > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadNotifications}
                </div>
              )}
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold">Уведомления</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {user.isAuthenticated ? (
              <div className="relative">
                <Link to="/profile" className="flex items-center space-x-2">
                  <img className="w-8 h-8 rounded-full" src={user.avatar} alt={user.name} />
                  <span className="text-gray-700 dark:text-gray-300">{user.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                Войти
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Home Page Component
export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesGrid />
      <FeaturedListings />
      <LocationSelector />
    </div>
  );
};

// Hero Section Component
export const HeroSection = () => {
  const navigate = useNavigate();
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(heroSearchQuery)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop"
          alt="Modern Marketplace"
        />
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Будущее торговли здесь
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto text-gray-200">
            MarketHub - полноценный маркетплейс с реальными покупками, корзиной и оплатой
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">🛒 Реальные покупки</span>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm">💳 Оплата картой</span>
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">₿ Криптоплатежи</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">🚚 Доставка</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleHeroSearch} className="relative bg-white/10 backdrop-blur-md rounded-2xl p-2">
              <input
                type="text"
                value={heroSearchQuery}
                onChange={(e) => setHeroSearchQuery(e.target.value)}
                placeholder="iPhone, Tesla, недвижимость..."
                className="w-full px-6 py-4 bg-white/20 text-white placeholder-gray-300 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
              />
              <button type="submit" className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                🔍 Найти
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">{EXTENDED_LISTINGS.length * 625}+</div>
              <div className="text-gray-300">Товаров</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-gray-300">Поддержка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15₿</div>
              <div className="text-gray-300">Криптовалют</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Categories Grid Component
export const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/catalog/${categoryId}`);
  };

  const categories = [
    { 
      id: 'electronics',
      name: 'Электроника', 
      icon: '📱', 
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'electronics').length,
      trend: '+25%'
    },
    { 
      id: 'cars',
      name: 'Автомобили', 
      icon: '🚗', 
      image: 'https://images.unsplash.com/photo-1558541815-e03db4c0a3fc?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'cars').length,
      trend: '+12%'
    },
    { 
      id: 'realestate',
      name: 'Недвижимость', 
      icon: '🏠', 
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'realestate').length,
      trend: '+8%'
    },
    { 
      id: 'services',
      name: 'Услуги', 
      icon: '🔧', 
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'services').length,
      trend: '+300%'
    },
    { 
      id: 'nft',
      name: 'NFT & Цифровое', 
      icon: '🎨', 
      image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'nft').length,
      trend: '+89%',
      isNew: true
    },
    { 
      id: 'furniture',
      name: 'Мебель', 
      icon: '🛋️', 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', 
      count: EXTENDED_LISTINGS.filter(item => item.category === 'furniture').length,
      trend: '+15%'
    },
    { 
      id: 'fashion',
      name: 'Мода', 
      icon: '👗', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop', 
      count: Math.floor(Math.random() * 10) + 5,
      trend: '+22%'
    },
    { 
      id: 'crypto',
      name: 'Криптовалюты', 
      icon: '₿', 
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop', 
      count: Math.floor(Math.random() * 8) + 3,
      trend: '+156%',
      isNew: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Категории товаров
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Полноценный маркетплейс с реальными товарами и услугами
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              {category.isNew && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  NEW
                </div>
              )}
              
              <div className="relative h-40 rounded-t-2xl overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/6366f1/ffffff?text=${category.icon}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-4 left-4 text-4xl drop-shadow-lg">
                    {category.icon}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {category.trend}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.count} товаров</p>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                  Смотреть ({category.count})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Listings Component
export const FeaturedListings = () => {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useContext(AppContext);

  const featuredProducts = EXTENDED_LISTINGS.filter(item => item.featured).slice(0, 6);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    // Show success notification
    alert(`${product.title} добавлен в корзину!`);
  };

  const handleToggleFavorite = (productId, e) => {
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🔥 Рекомендуемые товары
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Лучшие предложения с возможностью покупки</p>
          </div>
          <Link 
            to="/catalog" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Все товары
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ ТОП
                </div>
              )}

              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${product.title.substring(0, 10)}`;
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {product.features?.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleToggleFavorite(product.id, e)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(product.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">👁 {product.views}</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {product.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                      {product.cryptoPrice} BTC
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>📍 {product.location}</span>
                  <span>🕒 {product.time}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                  >
                    🛒 В корзину
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Location Selector Component
export const LocationSelector = () => {
  const cities = [
    { name: 'Москва', count: '25.5K', flag: '🏛️' },
    { name: 'Санкт-Петербург', count: '18.4K', flag: '🏰' },
    { name: 'Новосибирск', count: '7.6K', flag: '🏔️' },
    { name: 'Екатеринбург', count: '6.5K', flag: '🏭' },
    { name: 'Казань', count: '5.3K', flag: '🕌' },
    { name: 'Нижний Новгород', count: '4.2K', flag: '🏞️' },
    { name: 'Челябинск', count: '3.2K', flag: '🏗️' },
    { name: 'Самара', count: '2.1K', flag: '🚀' },
    { name: 'Омск', count: '1.8K', flag: '❄️' },
    { name: 'Ростов-на-Дону', count: '1.5K', flag: '🌻' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🌍 Выберите ваш город
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            MarketHub работает в 100+ городах России
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <button
              key={index}
              className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-6 text-center hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-2xl mb-2">{city.flag}</div>
              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {city.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {city.count} товаров
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full opacity-5 -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-5 translate-x-48 translate-y-48"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              MarketHub
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Полноценный маркетплейс с реальными покупками, корзиной, оплатой и доставкой. Покупайте и продавайте прямо сейчас! 🛒
            </p>
            <div className="text-sm text-gray-500">
              💳 Принимаем: Visa, MasterCard, Мир, Bitcoin, Ethereum, USDT
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-purple-400">🛒 Покупателям</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог товаров</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Корзина</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">Избранное</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Гарантии</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">💼 Продавцам</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/add-listing" className="hover:text-white transition-colors">Добавить товар</Link></li>
              <li><Link to="/my-listings" className="hover:text-white transition-colors">Мои объявления</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Аналитика</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Продвижение</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Комиссии</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">🆘 Поддержка</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/chat" className="hover:text-white transition-colors">Онлайн-чат</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Правила</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 MarketHub. Полноценный маркетплейс 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// AI Assistant Component
export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! Я помогу вам с покупками в MarketHub. Могу найти товар, помочь с оформлением заказа или ответить на вопросы о доставке! 🛒', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('корзин') || lowerMessage.includes('заказ')) {
      return 'Для оформления заказа перейдите в корзину и выберите способ оплаты. Доступны: карты, наличные, криптовалюты и рассрочка! 🛒';
    } else if (lowerMessage.includes('оплат') || lowerMessage.includes('плат')) {
      return 'Принимаем оплату картами (Visa, MasterCard, Мир), наличными, криптовалютами (BTC, ETH, USDT) и предоставляем рассрочку! 💳';
    } else if (lowerMessage.includes('доставк')) {
      return 'Доставка курьером 1-2 дня, самовывоз бесплатно, почтой по России 3-7 дней. Бесплатная доставка от 5000₽! 🚚';
    } else if (lowerMessage.includes('iphone') || lowerMessage.includes('айфон')) {
      return 'У нас есть iPhone 15 Pro за 149,990₽ с официальной гарантией! Можете добавить в корзину прямо сейчас. 📱';
    } else if (lowerMessage.includes('tesla') || lowerMessage.includes('тесла')) {
      return 'Tesla Model S Plaid 2024 за 8,500,000₽ или 2.15 BTC. Возможен тест-драйв и трейд-ин! 🚗';
    } else {
      return `Ищу товары по запросу "${userMessage}"... Найдено несколько интересных предложений! Хотите перейти в каталог? 🔍`;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = { type: 'user', text: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMsg = { type: 'bot', text: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse"
          title="AI-Помощник по покупкам"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🛒
                </div>
                <div>
                  <div className="font-semibold">Помощник покупок</div>
                  <div className="text-xs opacity-80">Онлайн • Поможем с заказом</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Вопрос о покупке..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};