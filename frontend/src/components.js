import React, { useState } from 'react';

// Header Component with Search and Navigation
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              Avito
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров и услуг"
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Подать объявление</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Мои объявления</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Избранное</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Вход</a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Подать объявление</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Мои объявления</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Избранное</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Вход</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.pexels.com/photos/1450386/pexels-photo-1450386.jpeg"
          alt="Marketplace"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Найдите всё, что ищете
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Более 50 миллионов объявлений от частных лиц и компаний
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Что вы ищете?"
                className="w-full px-6 py-4 text-gray-800 text-lg rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Categories Grid Component
export const CategoriesGrid = () => {
  const categories = [
    { name: 'Автомобили', icon: '🚗', image: 'https://images.unsplash.com/photo-1558541815-e03db4c0a3fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85', count: '2.5M' },
    { name: 'Недвижимость', icon: '🏠', image: 'https://images.pexels.com/photos/3162045/pexels-photo-3162045.jpeg', count: '1.2M' },
    { name: 'Электроника', icon: '📱', image: 'https://images.pexels.com/photos/1784269/pexels-photo-1784269.jpeg', count: '3.1M' },
    { name: 'Работа', icon: '💼', image: 'https://images.unsplash.com/photo-1567492857368-4ab6f0b3995a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', count: '850K' },
    { name: 'Мода и стиль', icon: '👗', image: 'https://images.pexels.com/photos/19473631/pexels-photo-19473631.jpeg', count: '1.8M' },
    { name: 'Дом и дача', icon: '🏡', image: 'https://images.pexels.com/photos/2134175/pexels-photo-2134175.jpeg', count: '920K' },
    { name: 'Услуги', icon: '🔧', image: 'https://images.unsplash.com/photo-1703768202246-c40573dbc218?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', count: '650K' },
    { name: 'Хобби и отдых', icon: '🎨', image: 'https://images.unsplash.com/photo-1491951931722-5a446214b4e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtYXJrZXRwbGFjZXxlbnwwfHx8Ymx1ZXwxNzUwNTkyMDkyfDA&ixlib=rb-4.1.0&q=85', count: '740K' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Популярные категории
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative h-32 rounded-t-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={category.image}
                  alt={category.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity">
                  <div className="absolute top-4 left-4 text-3xl">
                    {category.icon}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} объявлений</p>
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
  const listings = [
    {
      id: 1,
      title: 'BMW X5 2019',
      price: '2 850 000 ₽',
      image: 'https://images.unsplash.com/photo-1487947366323-374a622aeccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85',
      location: 'Москва',
      time: '2 часа назад',
      featured: true
    },
    {
      id: 2,
      title: 'iPhone 15 Pro 128GB',
      price: '89 990 ₽',
      image: 'https://images.pexels.com/photos/784139/pexels-photo-784139.jpeg',
      location: 'Санкт-Петербург',
      time: '1 час назад',
      featured: false
    },
    {
      id: 3,
      title: '2-комнатная квартира',
      price: '8 500 000 ₽',
      image: 'https://images.unsplash.com/photo-1510253557056-5dd072a2a7ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjYXJzfGVufDB8fHxibHVlfDE3NTA1OTIwOTh8MA&ixlib=rb-4.1.0&q=85',
      location: 'Москва, Центр',
      time: '3 часа назад',
      featured: true
    },
    {
      id: 4,
      title: 'MacBook Pro 2023',
      price: '165 000 ₽',
      image: 'https://images.pexels.com/photos/1784269/pexels-photo-1784269.jpeg',
      location: 'Екатеринбург',
      time: '4 часа назад',
      featured: false
    },
    {
      id: 5,
      title: 'Mercedes-Benz C-Class',
      price: '1 950 000 ₽',
      image: 'https://images.pexels.com/photos/3162045/pexels-photo-3162045.jpeg',
      location: 'Новосибирск',
      time: '5 часов назад',
      featured: true
    },
    {
      id: 6,
      title: 'Диван угловой новый',
      price: '45 000 ₽',
      image: 'https://images.pexels.com/photos/2134175/pexels-photo-2134175.jpeg',
      location: 'Казань',
      time: '6 часов назад',
      featured: false
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Рекомендуем
          </h2>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Смотреть все →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group relative"
            >
              {listing.featured && (
                <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                  Топ
                </div>
              )}
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={listing.image}
                  alt={listing.title}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {listing.price}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{listing.location}</span>
                  <span>{listing.time}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
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
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 
    'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'
  ];

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Выберите ваш город
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <button
              key={index}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
            >
              {city}
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">
              Avito
            </div>
            <p className="text-gray-400 mb-4">
              Крупнейшая площадка объявлений в России
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Как покупать</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Доставка Авито</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Авито Защита</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Продавцам</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Как продавать</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Реклама на Авито</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Пакеты услуг</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Авито Бизнес</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Центр поддержки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Сообщить о проблеме</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Блог Авито</a></li>
              <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Avito Clone. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};