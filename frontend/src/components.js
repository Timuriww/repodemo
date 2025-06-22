import React, { useState } from 'react';

// Header Component with Advanced Features
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const startVoiceSearch = () => {
    setIsVoiceSearch(true);
    // В реальном приложении здесь была бы интеграция с Web Speech API
    setTimeout(() => {
      setIsVoiceSearch(false);
      setSearchQuery('Поиск голосом активирован');
    }, 2000);
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with new branding */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MarketHub
            </div>
            <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
              AI-Powered
            </span>
          </div>

          {/* Advanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Умный поиск с AI-рекомендациями..."
                className={`w-full px-4 py-3 pl-12 pr-20 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
                <button
                  onClick={startVoiceSearch}
                  className={`p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors ${isVoiceSearch ? 'animate-pulse text-red-500' : 'text-purple-500'}`}
                  title="Голосовой поиск"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                  AI
                </button>
              </div>
            </div>
          </div>

          {/* Navigation with new features */}
          <nav className="hidden md:flex items-center space-x-6">
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
            <a href="#" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Подать объявление</span>
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Мои объявления</a>
            <div className="relative">
              <a href="#" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>Избранное</span>
              </a>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
            </div>
            <a href="#" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Войти
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
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

// Enhanced Hero Section
export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.pexels.com/photos/1450386/pexels-photo-1450386.jpeg"
          alt="Modern Marketplace"
        />
      </div>
      
      {/* Animated background elements */}
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
            MarketHub - первый в мире AI-powered маркетплейс с криптоплатежами и 3D-просмотром
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">🤖 AI-Поиск</span>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm">💎 Криптоплатежи</span>
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">🔊 Голосовой поиск</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">🚀 Быстрые сделки</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-2">
              <input
                type="text"
                placeholder="Попробуйте: 'Покажи мне iPhone с доставкой за час'"
                className="w-full px-6 py-4 bg-white/20 text-white placeholder-gray-300 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
              />
              <button className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                🚀 Найти
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">50M+</div>
              <div className="text-gray-300">Объявлений</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-gray-300">AI-Поддержка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15₿</div>
              <div className="text-gray-300">Криптовалют принимаем</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Advanced Categories with new features
export const CategoriesGrid = () => {
  const categories = [
    { 
      name: 'Автомобили', 
      icon: '🚗', 
      image: 'https://images.unsplash.com/photo-1558541815-e03db4c0a3fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85', 
      count: '2.5M',
      features: ['3D Просмотр', 'Виртуальный тест-драйв'],
      trend: '+12%'
    },
    { 
      name: 'Недвижимость', 
      icon: '🏠', 
      image: 'https://images.pexels.com/photos/3162045/pexels-photo-3162045.jpeg', 
      count: '1.2M',
      features: ['VR-туры', 'Ипотечный калькулятор'],
      trend: '+8%'
    },
    { 
      name: 'Электроника', 
      icon: '📱', 
      image: 'https://images.pexels.com/photos/1784269/pexels-photo-1784269.jpeg', 
      count: '3.1M',
      features: ['Проверка подлинности', 'Гарантия качества'],
      trend: '+25%'
    },
    { 
      name: 'Криптовалюты', 
      icon: '₿', 
      image: 'https://images.unsplash.com/photo-1567492857368-4ab6f0b3995a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', 
      count: '450K',
      features: ['P2P торговля', 'Безопасные сделки'],
      trend: '+156%',
      isNew: true
    },
    { 
      name: 'NFT & Цифровое', 
      icon: '🎨', 
      image: 'https://images.pexels.com/photos/19473631/pexels-photo-19473631.jpeg', 
      count: '890K',
      features: ['Блокчейн верификация', 'Мгновенная передача'],
      trend: '+89%',
      isNew: true
    },
    { 
      name: 'Дом и дача', 
      icon: '🏡', 
      image: 'https://images.pexels.com/photos/2134175/pexels-photo-2134175.jpeg', 
      count: '920K',
      features: ['AR-примерка', 'Экспресс-доставка'],
      trend: '+15%'
    },
    { 
      name: 'AI-Услуги', 
      icon: '🤖', 
      image: 'https://images.unsplash.com/photo-1703768202246-c40573dbc218?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', 
      count: '125K',
      features: ['Нейросети', 'Автоматизация'],
      trend: '+300%',
      isNew: true
    },
    { 
      name: 'Работа & Фриланс', 
      icon: '💼', 
      image: 'https://images.unsplash.com/photo-1491951931722-5a446214b4e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', 
      count: '650K',
      features: ['Умный подбор', 'Безопасные платежи'],
      trend: '+22%'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Инновационные категории
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Первый маркетплейс с поддержкой криптовалют, NFT и AI-технологий
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{category.count} объявлений</p>
                
                <div className="space-y-1 mb-4">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                  Перейти
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Featured Listings with new technologies
export const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      title: 'Tesla Model S 2024',
      price: '4 850 000 ₽',
      cryptoPrice: '1.2 BTC',
      image: 'https://images.unsplash.com/photo-1487947366323-374a622aeccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85',
      location: 'Москва',
      time: '2 часа назад',
      featured: true,
      features: ['3D Просмотр', 'Виртуальный тест', 'Crypto OK'],
      rating: 4.9,
      views: '1.2K',
      hasVr: true,
      quickDeal: true
    },
    {
      id: 2,
      title: 'iPhone 15 Pro + NFT Bundle',
      price: '149 990 ₽',
      cryptoPrice: '0.04 BTC',
      image: 'https://images.pexels.com/photos/784139/pexels-photo-784139.jpeg',
      location: 'Санкт-Петербург',
      time: '1 час назад',
      featured: false,
      features: ['Проверка подлинности', 'NFT в подарок', 'Гарантия 2 года'],
      rating: 4.8,
      views: '856',
      hasNft: true,
      quickDeal: false
    },
    {
      id: 3,
      title: 'Пентхаус с VR-туром',
      price: '25 500 000 ₽',
      cryptoPrice: '6.5 BTC',
      image: 'https://images.unsplash.com/photo-1510253557056-5dd072a2a7ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85',
      location: 'Москва, Центр',
      time: '3 часа назад',
      featured: true,
      features: ['VR-тур', 'Умный дом', 'Crypto платежи'],
      rating: 5.0,
      views: '2.8K',
      hasVr: true,
      quickDeal: true
    },
    {
      id: 4,
      title: 'MacBook Pro M3 + AI Tools',
      price: '285 000 ₽',
      cryptoPrice: '0.07 BTC',
      image: 'https://images.pexels.com/photos/1784269/pexels-photo-1784269.jpeg',
      location: 'Екатеринбург',
      time: '4 часа назад',
      featured: false,
      features: ['AI-оптимизация', 'Облачный доступ', 'Техподдержка 24/7'],
      rating: 4.7,
      views: '642',
      hasAi: true,
      quickDeal: true
    },
    {
      id: 5,
      title: 'Эксклюзивная NFT коллекция',
      price: '89 000 ₽',
      cryptoPrice: '0.02 BTC',
      image: 'https://images.pexels.com/photos/3162045/pexels-photo-3162045.jpeg',
      location: 'Цифровой мир',
      time: '5 часов назад',
      featured: true,
      features: ['Блокчейн верификация', 'Роялти 5%', 'Мгновенная передача'],
      rating: 4.6,
      views: '1.1K',
      hasNft: true,
      quickDeal: false
    },
    {
      id: 6,
      title: 'Умная мебель с AR',
      price: '125 000 ₽',
      cryptoPrice: '0.03 BTC',
      image: 'https://images.pexels.com/photos/2134175/pexels-photo-2134175.jpeg',
      location: 'Казань',
      time: '6 часов назад',
      featured: false,
      features: ['AR-примерка', 'Умное управление', 'Экодоставка'],
      rating: 4.5,
      views: '428',
      hasAr: true,
      quickDeal: true
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🔥 Горячие предложения
            </h2>
            <p className="text-gray-600 dark:text-gray-400">С поддержкой новейших технологий</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Все товары
            </button>
            <button className="border border-purple-300 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-all">
              AI-рекомендации
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
            >
              {listing.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ ТОП
                </div>
              )}
              
              {listing.quickDeal && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  ⚡ Быстрая сделка
                </div>
              )}

              <div className="relative h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={listing.image}
                  alt={listing.title}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {listing.hasVr && (
                        <button className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          🥽 VR
                        </button>
                      )}
                      {listing.hasNft && (
                        <button className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          🎨 NFT
                        </button>
                      )}
                      {listing.hasAi && (
                        <button className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          🤖 AI
                        </button>
                      )}
                      {listing.hasAr && (
                        <button className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                          📱 AR
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
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
                      {'★'.repeat(Math.floor(listing.rating))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{listing.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">👁 {listing.views}</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {listing.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {listing.price}
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                      {listing.cryptoPrice}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {listing.features.map((feature, index) => (
                    <span key={index} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>📍 {listing.location}</span>
                  <span>🕒 {listing.time}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                    Купить
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    💬 Торг
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

// AI Assistant Chat Bot Component
export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! Я AI-помощник MarketHub. Как дела? Могу помочь найти товар или ответить на вопросы! 🤖' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', text: inputMessage },
        { type: 'bot', text: 'Отличный вопрос! Я анализирую наш каталог... 🔍 Найдено 42 релевантных предложения с учетом ваших предпочтений!' }
      ]);
      setInputMessage('');
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <div className="font-semibold">AI-Помощник</div>
                  <div className="text-xs opacity-80">Онлайн • Отвечает мгновенно</div>
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
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Напишите сообщение..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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

// Enhanced Location Selector
export const LocationSelector = () => {
  const cities = [
    { name: 'Москва', count: '12.5M', flag: '🏛️' },
    { name: 'Санкт-Петербург', count: '5.4M', flag: '🏰' },
    { name: 'Новосибирск', count: '1.6M', flag: '🏔️' },
    { name: 'Екатеринбург', count: '1.5M', flag: '🏭' },
    { name: 'Казань', count: '1.3M', flag: '🕌' },
    { name: 'Нижний Новгород', count: '1.2M', flag: '🏞️' },
    { name: 'Челябинск', count: '1.2M', flag: '🏗️' },
    { name: 'Самара', count: '1.1M', flag: '🚀' },
    { name: 'Омск', count: '1.1M', flag: '❄️' },
    { name: 'Ростов-на-Дону', count: '1.1M', flag: '🌻' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🌍 Выберите ваш город
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            MarketHub работает в 50+ городах России с быстрой доставкой
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
                {city.count} объявлений
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
            🗺️ Показать все города
          </button>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer
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
              Первый в мире AI-powered маркетплейс с поддержкой криптовалют, NFT и передовых технологий. Будущее торговли уже здесь! 🚀
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.605 2.323-.751 2.88-.271 1.011-1.027 2.275-1.393 3.078 1.034.320 2.129.492 3.268.492 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001.012 0z"/>
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-500">
              💎 Принимаем: Bitcoin, Ethereum, USDT, Litecoin и еще 10+ криптовалют
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-purple-400">🛒 Покупателям</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🤖</span>AI-поиск</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🔒</span>Безопасность</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🚚</span>Экспресс-доставка</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🛡️</span>Crypto-защита</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🥽</span>VR-примерка</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">💼 Продавцам</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">📈</span>Аналитика продаж</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🎯</span>Таргетированная реклама</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">💰</span>Crypto-платежи</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🤝</span>Быстрые сделки</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🎨</span>NFT-магазин</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-green-400">🆘 Поддержка</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">💬</span>AI-чат 24/7</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">📞</span>Горячая линия</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">📚</span>База знаний</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🎓</span>Обучение</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🏢</span>О компании</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 MarketHub. Все права защищены. Powered by AI & Blockchain 🚀</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">API для разработчиков</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};