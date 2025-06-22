import React, { useState, useEffect, useRef } from 'react';

// Mock data for listings
const MOCK_LISTINGS = [
  {
    id: 1,
    title: 'Tesla Model S 2024',
    price: 4850000,
    cryptoPrice: 1.2,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    location: 'Москва',
    time: '2 часа назад',
    category: 'cars',
    featured: true,
    features: ['3D Просмотр', 'Виртуальный тест', 'Crypto OK'],
    rating: 4.9,
    views: 1200,
    description: 'Премиальная Tesla Model S в отличном состоянии. Полный автопилот, максимальная комплектация.',
    seller: 'Автосалон Премиум',
    phone: '+7 (495) 123-45-67'
  },
  {
    id: 2,
    title: 'iPhone 15 Pro 128GB',
    price: 149990,
    cryptoPrice: 0.04,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
    location: 'Санкт-Петербург',
    time: '1 час назад',
    category: 'electronics',
    featured: false,
    features: ['Проверка подлинности', 'Гарантия 2 года'],
    rating: 4.8,
    views: 856,
    description: 'Новый iPhone 15 Pro в заводской упаковке. Официальная гарантия Apple.',
    seller: 'TechStore',
    phone: '+7 (812) 987-65-43'
  },
  {
    id: 3,
    title: 'Пентхаус 200м² с VR-туром',
    price: 25500000,
    cryptoPrice: 6.5,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    location: 'Москва, Центр',
    time: '3 часа назад',
    category: 'realestate',
    featured: true,
    features: ['VR-тур', 'Умный дом', 'Crypto платежи'],
    rating: 5.0,
    views: 2800,
    description: 'Роскошный пентхаус в центре Москвы. Панорамные окна, терраса, система умный дом.',
    seller: 'Элитная недвижимость',
    phone: '+7 (495) 555-01-01'
  },
  {
    id: 4,
    title: 'MacBook Pro M3 16"',
    price: 285000,
    cryptoPrice: 0.07,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    location: 'Екатеринбург',
    time: '4 часа назад',
    category: 'electronics',
    featured: false,
    features: ['AI-оптимизация', 'Облачный доступ'],
    rating: 4.7,
    views: 642,
    description: 'MacBook Pro M3 с максимальной конфигурацией. Идеально для разработки и дизайна.',
    seller: 'IT-Store',
    phone: '+7 (343) 222-33-44'
  },
  {
    id: 5,
    title: 'Эксклюзивная NFT коллекция',
    price: 89000,
    cryptoPrice: 0.02,
    image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=400&h=300&fit=crop',
    location: 'Цифровой мир',
    time: '5 часов назад',
    category: 'nft',
    featured: true,
    features: ['Блокчейн верификация', 'Роялти 5%'],
    rating: 4.6,
    views: 1100,
    description: 'Уникальная NFT коллекция от известного цифрового художника. Ограниченный тираж.',
    seller: 'CryptoArt Gallery',
    phone: 'Только криптоплатежи'
  },
  {
    id: 6,
    title: 'Умный диван с AR-примеркой',
    price: 125000,
    cryptoPrice: 0.03,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    location: 'Казань',
    time: '6 часов назад',
    category: 'furniture',
    featured: false,
    features: ['AR-примерка', 'Умное управление'],
    rating: 4.5,
    views: 428,
    description: 'Современный умный диван с встроенной системой массажа и климат-контролем.',
    seller: 'Мебель Будущего',
    phone: '+7 (843) 777-88-99'
  },
  {
    id: 7,
    title: 'Freelance: Разработка AI-чатбота',
    price: 50000,
    cryptoPrice: 0.013,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    location: 'Удаленно',
    time: '1 день назад',
    category: 'services',
    featured: false,
    features: ['AI-технологии', 'Гарантия результата'],
    rating: 4.9,
    views: 234,
    description: 'Создание умного чатбота для вашего бизнеса. Интеграция с популярными платформами.',
    seller: 'AI Developer',
    phone: '+7 (999) 123-45-67'
  },
  {
    id: 8,
    title: 'BMW X5 2020',
    price: 3200000,
    cryptoPrice: 0.82,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    location: 'Новосибирск',
    time: '2 дня назад',
    category: 'cars',
    featured: false,
    features: ['Проверен', 'Один владелец'],
    rating: 4.4,
    views: 1567,
    description: 'BMW X5 в отличном состоянии. Один владелец, полная история обслуживания.',
    seller: 'Автомир',
    phone: '+7 (383) 444-55-66'
  }
];

// Categories data
const CATEGORIES = [
  { id: 'all', name: 'Все категории', icon: '📱' },
  { id: 'cars', name: 'Автомобили', icon: '🚗' },
  { id: 'realestate', name: 'Недвижимость', icon: '🏠' },
  { id: 'electronics', name: 'Электроника', icon: '📱' },
  { id: 'nft', name: 'NFT & Цифровое', icon: '🎨' },
  { id: 'furniture', name: 'Мебель', icon: '🛋️' },
  { id: 'services', name: 'Услуги', icon: '🔧' },
  { id: 'crypto', name: 'Криптовалюты', icon: '₿' }
];

// Header Component with working functionality
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
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

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ru-RU';
      
      setIsVoiceSearch(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsVoiceSearch(false);
        // Trigger search with voice input
        window.dispatchEvent(new CustomEvent('search', { detail: { query: transcript } }));
      };
      
      recognition.onerror = () => {
        setIsVoiceSearch(false);
        alert('Ошибка распознавания речи. Попробуйте еще раз.');
      };
      
      recognition.onend = () => {
        setIsVoiceSearch(false);
      };
      
      recognition.start();
    } else {
      alert('Голосовой поиск не поддерживается в вашем браузере');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('search', { detail: { query: searchQuery } }));
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MarketHub
            </div>
            <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
              AI-Powered
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
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
                  type="button"
                  onClick={startVoiceSearch}
                  className={`p-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors ${isVoiceSearch ? 'animate-pulse text-red-500' : 'text-purple-500'}`}
                  title="Голосовой поиск"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </button>
                <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                  AI
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
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
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              + Подать объявление
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Мои объявления
            </a>
            <div className="relative">
              <a href="#" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>Избранное</span>
              </a>
              {favorites.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </div>
              )}
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

// Working Hero Search Component
export const HeroSection = () => {
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      window.dispatchEvent(new CustomEvent('search', { detail: { query: heroSearchQuery } }));
      // Scroll to listings section
      document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
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
            MarketHub - первый в мире AI-powered маркетплейс с криптоплатежами и 3D-просмотром
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">🤖 AI-Поиск</span>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm">💎 Криптоплатежи</span>
            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm">🔊 Голосовой поиск</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm">🚀 Быстрые сделки</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleHeroSearch} className="relative bg-white/10 backdrop-blur-md rounded-2xl p-2">
              <input
                type="text"
                value={heroSearchQuery}
                onChange={(e) => setHeroSearchQuery(e.target.value)}
                placeholder="Попробуйте: 'Покажи мне iPhone с доставкой за час'"
                className="w-full px-6 py-4 bg-white/20 text-white placeholder-gray-300 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
              />
              <button type="submit" className="absolute right-3 top-3 bottom-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                🚀 Найти
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">{MOCK_LISTINGS.length * 6250}+</div>
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

// Working Categories Component
export const CategoriesGrid = () => {
  const handleCategoryClick = (categoryId) => {
    window.dispatchEvent(new CustomEvent('categoryFilter', { detail: { category: categoryId } }));
    document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { 
      id: 'cars',
      name: 'Автомобили', 
      icon: '🚗', 
      image: 'https://images.unsplash.com/photo-1558541815-e03db4c0a3fc?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'cars').length,
      features: ['3D Просмотр', 'Виртуальный тест-драйв'],
      trend: '+12%'
    },
    { 
      id: 'realestate',
      name: 'Недвижимость', 
      icon: '🏠', 
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'realestate').length,
      features: ['VR-туры', 'Ипотечный калькулятор'],
      trend: '+8%'
    },
    { 
      id: 'electronics',
      name: 'Электроника', 
      icon: '📱', 
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'electronics').length,
      features: ['Проверка подлинности', 'Гарантия качества'],
      trend: '+25%'
    },
    { 
      id: 'crypto',
      name: 'Криптовалюты', 
      icon: '₿', 
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop', 
      count: Math.floor(Math.random() * 5) + 1,
      features: ['P2P торговля', 'Безопасные сделки'],
      trend: '+156%',
      isNew: true
    },
    { 
      id: 'nft',
      name: 'NFT & Цифровое', 
      icon: '🎨', 
      image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'nft').length,
      features: ['Блокчейн верификация', 'Мгновенная передача'],
      trend: '+89%',
      isNew: true
    },
    { 
      id: 'furniture',
      name: 'Дом и дача', 
      icon: '🏡', 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'furniture').length,
      features: ['AR-примерка', 'Экспресс-доставка'],
      trend: '+15%'
    },
    { 
      id: 'services',
      name: 'AI-Услуги', 
      icon: '🤖', 
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop', 
      count: MOCK_LISTINGS.filter(item => item.category === 'services').length,
      features: ['Нейросети', 'Автоматизация'],
      trend: '+300%',
      isNew: true
    },
    { 
      id: 'jobs',
      name: 'Работа & Фриланс', 
      icon: '💼', 
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop', 
      count: Math.floor(Math.random() * 3) + 1,
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
                  Перейти ({category.count})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Working Listings Component with Search and Filter
export const FeaturedListings = () => {
  const [filteredListings, setFilteredListings] = useState(MOCK_LISTINGS);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Listen for search and filter events
  useEffect(() => {
    const handleSearch = (event) => {
      const query = event.detail.query.toLowerCase();
      filterListings(query, currentCategory);
    };

    const handleCategoryFilter = (event) => {
      const category = event.detail.category;
      setCurrentCategory(category);
      filterListings('', category);
    };

    window.addEventListener('search', handleSearch);
    window.addEventListener('categoryFilter', handleCategoryFilter);

    return () => {
      window.removeEventListener('search', handleSearch);
      window.removeEventListener('categoryFilter', handleCategoryFilter);
    };
  }, [currentCategory]);

  const filterListings = (query = '', category = 'all') => {
    let filtered = MOCK_LISTINGS;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }

    // Sort listings
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
    }

    setFilteredListings(filtered);
  };

  const toggleFavorite = (listingId) => {
    const newFavorites = favorites.includes(listingId) 
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Apply sort when sortBy changes
  useEffect(() => {
    filterListings('', currentCategory);
  }, [sortBy]);

  return (
    <section id="listings-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🔥 {currentCategory === 'all' ? 'Все объявления' : CATEGORIES.find(c => c.id === currentCategory)?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Найдено: {filteredListings.length} объявлений
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <select
              value={currentCategory}
              onChange={(e) => {
                setCurrentCategory(e.target.value);
                filterListings('', e.target.value);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Сначала новые</option>
              <option value="price-low">Сначала дешевые</option>
              <option value="price-high">Сначала дорогие</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>
        
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Попробуйте изменить параметры поиска или выберите другую категорию
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              >
                {listing.featured && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ ТОП
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={listing.image}
                    alt={listing.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${listing.title.substring(0, 10)}`;
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {listing.features.map((feature, index) => (
                          <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(listing.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.share && navigator.share({
                              title: listing.title,
                              text: listing.description,
                              url: window.location.href
                            });
                          }}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6" onClick={() => setSelectedListing(listing)}>
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
                        {formatPrice(listing.price)}
                      </span>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                        {listing.cryptoPrice} BTC
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>📍 {listing.location}</span>
                    <span>🕒 {listing.time}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                      Подробнее
                    </button>
                    <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      💬 Торг
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Listing Detail Modal */}
        {selectedListing && (
          <ListingModal 
            listing={selectedListing} 
            onClose={() => setSelectedListing(null)}
            onToggleFavorite={() => toggleFavorite(selectedListing.id)}
            isFavorite={favorites.includes(selectedListing.id)}
          />
        )}
      </div>
    </section>
  );
};

// Working Listing Detail Modal
const ListingModal = ({ listing, onClose, onToggleFavorite, isFavorite }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-t-2xl"
            src={listing.image}
            alt={listing.title}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/800x300/6366f1/ffffff?text=${listing.title.substring(0, 10)}`;
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {listing.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <span>📍 {listing.location}</span>
                <span>🕒 {listing.time}</span>
                <span>👁 {listing.views} просмотров</span>
              </div>
            </div>
            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-full transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {formatPrice(listing.price)}
                  </span>
                  <span className="text-xl text-orange-600 dark:text-orange-400 font-semibold">
                    {listing.cryptoPrice} BTC
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(listing.rating))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{listing.rating} из 5</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Описание</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {listing.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Особенности</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feature, index) => (
                    <span key={index} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Продавец</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {listing.seller.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{listing.seller}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Проверенный продавец</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                    📞 Показать телефон
                  </button>
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                    💬 Написать в WhatsApp
                  </button>
                  <button className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    🤝 Предложить свою цену
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Working AI Assistant Component
export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! Я AI-помощник MarketHub. Могу помочь найти товар, ответить на вопросы о сделках или дать рекомендации! 🤖', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость')) {
      return 'Анализирую цены на рынке... 📊 Средняя цена по вашему запросу составляет 150-200 тысяч рублей. Могу найти более выгодные предложения!';
    } else if (lowerMessage.includes('iphone') || lowerMessage.includes('айфон')) {
      return 'Нашел 12 iPhone в наличии! 📱 Цены от 89 990₽ до 149 990₽. Хотите посмотреть актуальные предложения?';
    } else if (lowerMessage.includes('авто') || lowerMessage.includes('машина') || lowerMessage.includes('tesla')) {
      return 'В нашем каталоге 156 автомобилей! 🚗 Включая Tesla, BMW, Mercedes. Какой бюджет вас интересует?';
    } else if (lowerMessage.includes('крипто') || lowerMessage.includes('bitcoin') || lowerMessage.includes('биткоин')) {
      return 'Принимаем 15+ криптовалют! ₿ Bitcoin, Ethereum, USDT и другие. Курс обновляется в реальном времени. Безопасные P2P сделки!';
    } else if (lowerMessage.includes('доставка')) {
      return 'Экспресс-доставка за 1-2 часа по Москве! 🚚 В другие города - 1-3 дня. Бесплатная доставка от 5000₽.';
    } else if (lowerMessage.includes('помощь') || lowerMessage.includes('как')) {
      return 'Могу помочь с поиском товаров, проверкой цен, оформлением сделок и криптоплатежами! Просто скажите, что вас интересует 😊';
    } else {
      return `Интересный вопрос! 🤔 Ищу информацию по "${userMessage}"... Найдено 23 релевантных предложения! Хотите посмотреть лучшие варианты?`;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = { type: 'user', text: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMsg = { type: 'bot', text: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse"
          title="AI-Помощник"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </button>
        {!isOpen && (
          <div className="absolute -top-12 -left-20 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            Спросите AI-помощника!
          </div>
        )}
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
                placeholder="Спросите что-нибудь..."
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

// Location Selector Component
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

  const handleCitySelect = (cityName) => {
    alert(`Выбран город: ${cityName}`);
    // In a real app, this would update the user's location preference
  };

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
              onClick={() => handleCitySelect(city.name)}
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
          <button 
            onClick={() => alert('Показать все города')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            🗺️ Показать все города
          </button>
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