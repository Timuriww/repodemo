import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from './App';
import { EXTENDED_LISTINGS, PAYMENT_METHODS, CRYPTO_RATES } from './data';

// Cart Page Component
export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, user } = useContext(AppContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCrypto = () => {
    return cart.reduce((total, item) => total + (item.cryptoPrice * item.quantity), 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    return total >= 5000 ? 0 : 500;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Корзина пуста
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-block"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🛒 Корзина ({cart.length})
          </h1>
          <Link
            to="/catalog"
            className="text-purple-600 hover:text-purple-800 transition-colors"
          >
            ← Продолжить покупки
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/100x100/6366f1/ffffff?text=${item.title.substring(0, 3)}`;
                    }}
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      📍 {item.location}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        {item.cryptoPrice} BTC
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      title="Удалить из корзины"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Итого за {item.quantity} шт.:
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">
                        {(item.cryptoPrice * item.quantity).toFixed(4)} BTC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Итого по заказу
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Товары ({cart.length}):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Доставка:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getShippingCost() === 0 ? 'Бесплатно' : formatPrice(getShippingCost())}
                  </span>
                </div>
                
                {getShippingCost() > 0 && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    💡 Бесплатная доставка от 5,000₽
                  </div>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">К оплате:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {formatPrice(getFinalTotal())}
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">
                        ≈ {getTotalCrypto().toFixed(4)} BTC
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Способы оплаты:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center text-xs">
                    💳 Карта
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center text-xs">
                    ₿ Crypto
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center text-xs">
                    💵 Наличные
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center text-xs">
                    📅 Рассрочка
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                🚀 Оформить заказ
              </button>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Безопасная оплата</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Page Component
export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, user } = useContext(AppContext);
  const [step, setStep] = useState(1); // 1: Contact, 2: Delivery, 3: Payment, 4: Confirmation
  const [orderData, setOrderData] = useState({
    contact: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    },
    delivery: {
      method: 'courier',
      address: '',
      city: 'Москва',
      date: '',
      time: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cryptoWallet: ''
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    if (orderData.delivery.method === 'pickup') return 0;
    return total >= 5000 ? 0 : 500;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost();
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert('🎉 Заказ успешно оформлен! Номер заказа: #MH-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    navigate('/profile');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Корзина пуста</h2>
          <Link to="/catalog" className="text-purple-600 hover:text-purple-800">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Оформление заказа
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[
              { num: 1, title: 'Контакты' },
              { num: 2, title: 'Доставка' },
              { num: 3, title: 'Оплата' },
              { num: 4, title: 'Подтверждение' }
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepItem.num 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepItem.num}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepItem.num 
                    ? 'text-purple-600 dark:text-purple-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {stepItem.title}
                </span>
                {stepItem.num < 4 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step > stepItem.num ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    📞 Контактная информация
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Имя и фамилия *
                      </label>
                      <input
                        type="text"
                        value={orderData.contact.name}
                        onChange={(e) => setOrderData({
                          ...orderData,
                          contact: { ...orderData.contact, name: e.target.value }
                        })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Иван Петров"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={orderData.contact.email}
                        onChange={(e) => setOrderData({
                          ...orderData,
                          contact: { ...orderData.contact, email: e.target.value }
                        })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="ivan@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={orderData.contact.phone}
                        onChange={(e) => setOrderData({
                          ...orderData,
                          contact: { ...orderData.contact, phone: e.target.value }
                        })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    🚚 Способ доставки
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        orderData.delivery.method === 'courier' 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          value="courier"
                          checked={orderData.delivery.method === 'courier'}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            delivery: { ...orderData.delivery, method: e.target.value }
                          })}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl mb-2">🚚</div>
                          <div className="font-medium text-gray-900 dark:text-white">Курьер</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">1-2 дня</div>
                          <div className="text-sm text-green-600 dark:text-green-400">
                            {getTotalPrice() >= 5000 ? 'Бесплатно' : '500₽'}
                          </div>
                        </div>
                      </label>
                      
                      <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        orderData.delivery.method === 'pickup' 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={orderData.delivery.method === 'pickup'}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            delivery: { ...orderData.delivery, method: e.target.value }
                          })}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl mb-2">🏪</div>
                          <div className="font-medium text-gray-900 dark:text-white">Самовывоз</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Сегодня</div>
                          <div className="text-sm text-green-600 dark:text-green-400">Бесплатно</div>
                        </div>
                      </label>
                    </div>

                    {orderData.delivery.method === 'courier' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Адрес доставки *
                          </label>
                          <textarea
                            value={orderData.delivery.address}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              delivery: { ...orderData.delivery, address: e.target.value }
                            })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows="3"
                            placeholder="Улица, дом, квартира, подъезд, этаж"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    💳 Способ оплаты
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                        <label key={key} className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          orderData.payment.method === key 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          <input
                            type="radio"
                            name="payment"
                            value={key}
                            checked={orderData.payment.method === key}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              payment: { ...orderData.payment, method: e.target.value }
                            })}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-2xl mb-2">{method.icon}</div>
                            <div className="font-medium text-gray-900 dark:text-white">{method.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{method.description}</div>
                            {method.fee > 0 && (
                              <div className="text-sm text-orange-600 dark:text-orange-400">
                                Комиссия {method.fee}%
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {orderData.payment.method === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Номер карты *
                          </label>
                          <input
                            type="text"
                            value={orderData.payment.cardNumber}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              payment: { ...orderData.payment, cardNumber: e.target.value }
                            })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              MM/YY *
                            </label>
                            <input
                              type="text"
                              value={orderData.payment.expiryDate}
                              onChange={(e) => setOrderData({
                                ...orderData,
                                payment: { ...orderData.payment, expiryDate: e.target.value }
                              })}
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="12/25"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              CVV *
                            </label>
                            <input
                              type="text"
                              value={orderData.payment.cvv}
                              onChange={(e) => setOrderData({
                                ...orderData,
                                payment: { ...orderData.payment, cvv: e.target.value }
                              })}
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {orderData.payment.method === 'crypto' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Кошелек для возврата (опционально)
                        </label>
                        <input
                          type="text"
                          value={orderData.payment.cryptoWallet}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            payment: { ...orderData.payment, cryptoWallet: e.target.value }
                          })}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          ₿ К оплате: {(getFinalTotal() / CRYPTO_RATES.BTC).toFixed(6)} BTC
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    ✅ Подтверждение заказа
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Контакты:</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {orderData.contact.name}<br/>
                        {orderData.contact.email}<br/>
                        {orderData.contact.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Доставка:</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {orderData.delivery.method === 'courier' ? '🚚 Курьером' : '🏪 Самовывоз'}
                        {orderData.delivery.address && (
                          <>
                            <br/>Адрес: {orderData.delivery.address}
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Оплата:</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {PAYMENT_METHODS[orderData.payment.method]?.icon} {PAYMENT_METHODS[orderData.payment.method]?.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Назад
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Далее →
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold"
                  >
                    🎉 Оформить заказ
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ваш заказ
              </h3>
              
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 py-2">
                    <img
                      className="w-12 h-12 object-cover rounded"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Товары:</span>
                  <span className="text-gray-900 dark:text-white">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Доставка:</span>
                  <span className="text-gray-900 dark:text-white">
                    {getShippingCost() === 0 ? 'Бесплатно' : formatPrice(getShippingCost())}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Итого:</span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatPrice(getFinalTotal())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};