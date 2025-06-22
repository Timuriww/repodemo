import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AppContext } from './App';
import { EXTENDED_LISTINGS, CATEGORIES, PAYMENT_METHODS, CRYPTO_RATES } from './data';

// Catalog Page Component
export const CatalogPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useContext(AppContext);
  const [products, setProducts] = useState(EXTENDED_LISTINGS);
  const [filteredProducts, setFilteredProducts] = useState(EXTENDED_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
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

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, searchQuery, priceRange, sortBy, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const currentCategory = CATEGORIES.find(cat => cat.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-purple-600 hover:text-purple-800">Главная</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 dark:text-gray-100">Каталог</span>
              </div>
            </li>
            {selectedCategory !== 'all' && (
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900 dark:text-gray-100">{currentCategory.name}</span>
                </div>
              </li>
            )}
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Фильтры</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Категория
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('all');
                  }}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Filter */}
              {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Подкатегория
                  </label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">Все</option>
                    {currentCategory.subcategories.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Цена от {formatPrice(priceRange[0])} до {formatPrice(priceRange[1])}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Быстрые фильтры</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">В наличии</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Бесплатная доставка</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Криптоплатежи</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCategory === 'all' ? 'Все товары' : currentCategory.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Найдено: {filteredProducts.length} товаров
                </p>
              </div>
              
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="newest">Сначала новые</option>
                  <option value="price-low">Сначала дешевые</option>
                  <option value="price-high">Сначала дорогие</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={addToCart}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    alert(`${product.title} добавлен в корзину!`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div
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
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
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
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          🛒 В корзину
        </button>
      </div>
    </div>
  );
};

// Product Detail Page Component
export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, user } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  useEffect(() => {
    const foundProduct = EXTENDED_LISTINGS.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct && foundProduct.images) {
      setSelectedImage(0);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Товар не найден</h2>
          <Link to="/catalog" className="text-purple-600 hover:text-purple-800">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.title} (${quantity} шт.) добавлен в корзину!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleContactSeller = () => {
    navigate(`/chat/${product.seller.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-purple-600 hover:text-purple-800">Главная</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/catalog" className="text-purple-600 hover:text-purple-800">Каталог</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 dark:text-gray-100">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Product Images */}
          <div>
            <div className="relative">
              <img
                className="w-full h-96 object-cover rounded-lg mb-4"
                src={product.images ? product.images[selectedImage] : product.image}
                alt={product.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400/6366f1/ffffff?text=${product.title.substring(0, 10)}`;
                }}
              />
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${
                        selectedImage === index ? 'ring-2 ring-purple-500' : ''
                      }`}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/100x100/6366f1/ffffff?text=${index + 1}`;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-3 rounded-full transition-colors ${
                  favorites.includes(product.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">{product.rating}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">👁 {product.views} просмотров</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">📍 {product.location}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-orange-600 dark:text-orange-400 font-semibold">
                  ≈ {product.cryptoPrice} BTC
                </span>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  ≈ ${Math.round(product.price / 92)} USDT
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Описание</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.features && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Особенности</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <span key={index} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.specifications && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Характеристики</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <span className="text-gray-600 dark:text-gray-400">{key}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Payment Method */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Количество:
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Способ оплаты:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.paymentMethods?.map(method => (
                    <button
                      key={method}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`p-2 rounded-lg border text-sm ${
                        selectedPaymentMethod === method
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {PAYMENT_METHODS[method]?.icon} {PAYMENT_METHODS[method]?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold"
              >
                💳 Купить сейчас
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                🛒 Добавить в корзину
              </button>
              <button
                onClick={handleContactSeller}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                💬 Написать продавцу
              </button>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        {product.seller && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Продавец</h3>
            <div className="flex items-center space-x-4">
              <img
                className="w-16 h-16 rounded-full"
                src={product.seller.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`}
                alt={product.seller.name}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.seller.name}
                  </h4>
                  {product.seller.verified && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      ✅ Проверен
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>⭐ {product.seller.rating} ({product.seller.reviewsCount} отзывов)</span>
                  <span>⏱ Отвечает {product.seller.responseTime}</span>
                </div>
              </div>
              <button
                onClick={handleContactSeller}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Написать
              </button>
            </div>
          </div>
        )}

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Отзывы ({product.reviews.length})
            </h3>
            <div className="space-y-4">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{review.user}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};