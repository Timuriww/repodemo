import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from './App';
import { EXTENDED_LISTINGS, CATEGORIES } from './data';

// Favorites Page Component
export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useContext(AppContext);
  
  const favoriteProducts = EXTENDED_LISTINGS.filter(product => 
    favorites.includes(product.id)
  );

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
    alert(`${product.title} добавлен в корзину!`);
  };

  const handleRemoveFavorite = (productId, e) => {
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ❤️ Избранное ({favorites.length})
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Товары, которые вам понравились
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Избранное пусто
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Добавляйте товары в избранное, нажимая на сердечко
            </p>
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-block"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    src={product.image}
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${product.title.substring(0, 10)}`;
                    }}
                  />
                  {product.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                      ТОП
                    </div>
                  )}
                  <button
                    onClick={(e) => handleRemoveFavorite(product.id, e)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">👁 {product.views}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-orange-600 dark:text-orange-400">
                      {product.cryptoPrice} BTC
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>📍 {product.location}</span>
                    <span>🕒 {product.time}</span>
                  </div>
                  
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    🛒 В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Page Component
export const ProfilePage = () => {
  const { user, setUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSaveProfile = () => {
    setUser({ ...user, ...editData });
    setIsEditing(false);
    alert('Профиль обновлен!');
  };

  const myOrders = [
    {
      id: 'MH-A1B2C3',
      date: '2024-12-22',
      status: 'delivered',
      total: 149990,
      items: [
        { title: 'iPhone 15 Pro 128GB', quantity: 1, price: 149990 }
      ]
    },
    {
      id: 'MH-D4E5F6',
      date: '2024-12-20',
      status: 'processing',
      total: 285000,
      items: [
        { title: 'MacBook Pro M3 16"', quantity: 1, price: 285000 }
      ]
    },
    {
      id: 'MH-G7H8I9',
      date: '2024-12-18',
      status: 'shipped',
      total: 450000,
      items: [
        { title: 'Дизайнерский диван Minotti', quantity: 1, price: 450000 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Доставлено';
      case 'shipped': return 'В пути';
      case 'processing': return 'Обработка';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <div className="flex items-center space-x-6">
            <img
              className="w-24 h-24 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-600 dark:text-gray-400">
                  ⭐ {user.rating} ({user.reviewsCount} отзывов)
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  ✅ Проверенный пользователь
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                📧 {user.email} • 📞 {user.phone}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatPrice(user.balance)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Баланс</div>
              <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                {user.cryptoBalance.BTC} BTC • {user.cryptoBalance.ETH} ETH
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'profile', name: 'Профиль', icon: '👤' },
                { id: 'orders', name: 'Заказы', icon: '📦' },
                { id: 'listings', name: 'Объявления', icon: '📋' },
                { id: 'wallet', name: 'Кошелек', icon: '💰' },
                { id: 'settings', name: 'Настройки', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Личная информация
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {isEditing ? '❌ Отмена' : '✏️ Редактировать'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Имя и фамилия
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💾 Сохранить
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Имя и фамилия
                        </label>
                        <p className="text-gray-900 dark:text-white">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <p className="text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Телефон
                        </label>
                        <p className="text-gray-900 dark:text-white">{user.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Рейтинг
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          ⭐ {user.rating} из 5 ({user.reviewsCount} отзывов)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  История заказов
                </h2>
                <div className="space-y-4">
                  {myOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Заказ #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700 dark:text-gray-300">
                              {item.title} × {item.quantity}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Итого: {formatPrice(order.total)}
                        </span>
                        <div className="space-x-2">
                          <button className="text-purple-600 hover:text-purple-800 text-sm">
                            Подробнее
                          </button>
                          {order.status === 'delivered' && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Повторить заказ
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet Tab */}
            {activeTab === 'wallet' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Кошелек и баланс
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6">
                    <div className="text-sm opacity-90 mb-1">Рублевый баланс</div>
                    <div className="text-2xl font-bold">{formatPrice(user.balance)}</div>
                    <div className="text-sm opacity-75 mt-2">Основной счет</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg p-6">
                    <div className="text-sm opacity-90 mb-1">Bitcoin</div>
                    <div className="text-2xl font-bold">{user.cryptoBalance.BTC} BTC</div>
                    <div className="text-sm opacity-75 mt-2">≈ {formatPrice(user.cryptoBalance.BTC * 3950000)}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6">
                    <div className="text-sm opacity-90 mb-1">Ethereum</div>
                    <div className="text-2xl font-bold">{user.cryptoBalance.ETH} ETH</div>
                    <div className="text-sm opacity-75 mt-2">≈ {formatPrice(user.cryptoBalance.ETH * 250000)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Пополнить баланс
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                        💳 Банковской картой
                      </button>
                      <button className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                        ₿ Криптовалютой
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Вывести средства
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                        🏦 На банковскую карту
                      </button>
                      <button className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                        📱 На электронный кошелек
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {(activeTab === 'listings' || activeTab === 'settings') && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Раздел в разработке
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Этот функционал будет доступен в ближайшее время
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// My Listings Page Component
export const MyListingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const myListings = [
    {
      id: 10,
      title: 'iPad Pro 12.9" 2024',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      status: 'active',
      views: 245,
      favorites: 12,
      created: '2024-12-20'
    },
    {
      id: 11,
      title: 'Велосипед горный Trek',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      status: 'sold',
      views: 89,
      favorites: 7,
      created: '2024-12-15',
      soldDate: '2024-12-21'
    },
    {
      id: 12,
      title: 'Куртка зимняя Nike',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      status: 'inactive',
      views: 34,
      favorites: 3,
      created: '2024-12-10'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'sold': return 'Продано';
      case 'inactive': return 'Неактивно';
      default: return 'Неизвестно';
    }
  };

  const filteredListings = myListings.filter(listing => {
    if (activeTab === 'all') return true;
    return listing.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📋 Мои объявления
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Управляйте своими объявлениями
            </p>
          </div>
          <Link
            to="/add-listing"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>Добавить объявление</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {myListings.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Всего объявлений</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {myListings.filter(l => l.status === 'active').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Активных</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {myListings.filter(l => l.status === 'sold').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Продано</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {myListings.reduce((sum, l) => sum + l.views, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Всего просмотров</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'all', name: 'Все', count: myListings.length },
                { id: 'active', name: 'Активные', count: myListings.filter(l => l.status === 'active').length },
                { id: 'sold', name: 'Проданные', count: myListings.filter(l => l.status === 'sold').length },
                { id: 'inactive', name: 'Неактивные', count: myListings.filter(l => l.status === 'inactive').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {filteredListings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Нет объявлений
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {activeTab === 'all' 
                    ? 'У вас пока нет объявлений'
                    : `Нет объявлений со статусом "${getStatusText(activeTab)}"`
                  }
                </p>
                <Link
                  to="/add-listing"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-block"
                >
                  Создать первое объявление
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-20 h-20 object-cover rounded-lg"
                        src={listing.image}
                        alt={listing.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/100x100/6366f1/ffffff?text=${listing.title.substring(0, 3)}`;
                        }}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {listing.title}
                            </h3>
                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                              {formatPrice(listing.price)}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>👁 {listing.views} просмотров</span>
                              <span>❤️ {listing.favorites} в избранном</span>
                              <span>📅 {new Date(listing.created).toLocaleDateString('ru-RU')}</span>
                              {listing.soldDate && (
                                <span>✅ Продано {new Date(listing.soldDate).toLocaleDateString('ru-RU')}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(listing.status)}`}>
                              {getStatusText(listing.status)}
                            </span>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                ✏️ Редактировать
                              </button>
                              <button className="text-gray-600 hover:text-gray-800 text-sm">
                                📊 Статистика
                              </button>
                              {listing.status === 'active' && (
                                <button className="text-red-600 hover:text-red-800 text-sm">
                                  ⏸ Деактивировать
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};