import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './App';
import { CATEGORIES, PAYMENT_METHODS } from './data';

// Add Listing Page Component
export const AddListingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [step, setStep] = useState(1); // 1: Category, 2: Details, 3: Photos, 4: Pricing, 5: Publish
  const [listingData, setListingData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: '',
    cryptoPrice: '',
    condition: 'new',
    location: 'Москва',
    images: [],
    features: [],
    specifications: {},
    paymentMethods: ['card'],
    delivery: {
      pickup: true,
      delivery: false,
      shipping: false
    }
  });

  const [dragOver, setDragOver] = useState(false);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleImageUpload = (files) => {
    // В реальном приложении здесь была бы загрузка на сервер
    const imageUrls = Array.from(files).map((file, index) => 
      `https://via.placeholder.com/600x400/6366f1/ffffff?text=Фото+${listingData.images.length + index + 1}`
    );
    setListingData({
      ...listingData,
      images: [...listingData.images, ...imageUrls]
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handlePublish = () => {
    // В реальном приложении здесь была бы отправка на сервер
    alert('🎉 Объявление успешно опубликовано!');
    navigate('/my-listings');
  };

  const currentCategory = CATEGORIES.find(cat => cat.id === listingData.category) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📝 Добавить объявление
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[
              { num: 1, title: 'Категория' },
              { num: 2, title: 'Описание' },
              { num: 3, title: 'Фотографии' },
              { num: 4, title: 'Цена' },
              { num: 5, title: 'Публикация' }
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
                {stepItem.num < 5 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step > stepItem.num ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                📂 Выберите категорию
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {CATEGORIES.filter(cat => cat.id !== 'all').map((category) => (
                  <label key={category.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    listingData.category === category.id 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                  }`}>
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={listingData.category === category.id}
                      onChange={(e) => setListingData({
                        ...listingData,
                        category: e.target.value,
                        subcategory: ''
                      })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Subcategory Selection */}
              {currentCategory.subcategories && currentCategory.subcategories.length > 0 && listingData.category && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Выберите подкатегорию
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentCategory.subcategories.map((sub) => (
                      <label key={sub.id} className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                        listingData.subcategory === sub.id 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                      }`}>
                        <input
                          type="radio"
                          name="subcategory"
                          value={sub.id}
                          checked={listingData.subcategory === sub.id}
                          onChange={(e) => setListingData({
                            ...listingData,
                            subcategory: e.target.value
                          })}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{sub.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                📝 Описание товара
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Название объявления *
                  </label>
                  <input
                    type="text"
                    value={listingData.title}
                    onChange={(e) => setListingData({ ...listingData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Например: iPhone 15 Pro 128GB Space Black"
                    maxLength="100"
                  />
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {listingData.title.length}/100
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Подробное описание *
                  </label>
                  <textarea
                    value={listingData.description}
                    onChange={(e) => setListingData({ ...listingData, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows="6"
                    placeholder="Расскажите о товаре подробнее: состояние, комплектация, особенности..."
                    maxLength="2000"
                  />
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {listingData.description.length}/2000
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Состояние *
                    </label>
                    <select
                      value={listingData.condition}
                      onChange={(e) => setListingData({ ...listingData, condition: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="new">Новое</option>
                      <option value="excellent">Отличное</option>
                      <option value="good">Хорошее</option>
                      <option value="fair">Удовлетворительное</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Местоположение *
                    </label>
                    <select
                      value={listingData.location}
                      onChange={(e) => setListingData({ ...listingData, location: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Москва">Москва</option>
                      <option value="Санкт-Петербург">Санкт-Петербург</option>
                      <option value="Новосибирск">Новосибирск</option>
                      <option value="Екатеринбург">Екатеринбург</option>
                      <option value="Казань">Казань</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                📸 Фотографии товара
              </h2>
              
              <div className="mb-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                >
                  <div className="text-6xl mb-4">📷</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Добавьте фотографии
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Перетащите файлы сюда или нажмите для выбора
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                  >
                    Выбрать файлы
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Максимум 10 фото, до 5МБ каждое
                  </p>
                </div>
              </div>

              {/* Uploaded Images */}
              {listingData.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Загруженные фото ({listingData.images.length}/10)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {listingData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          className="w-full h-32 object-cover rounded-lg"
                          src={image}
                          alt={`Фото ${index + 1}`}
                        />
                        <button
                          onClick={() => setListingData({
                            ...listingData,
                            images: listingData.images.filter((_, i) => i !== index)
                          })}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs">
                            Главное фото
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Pricing */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                💰 Цена и способы оплаты
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Цена в рублях *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={listingData.price}
                        onChange={(e) => {
                          const price = e.target.value;
                          const btcPrice = price ? (parseFloat(price) / 3950000).toFixed(6) : '';
                          setListingData({ 
                            ...listingData, 
                            price: price,
                            cryptoPrice: btcPrice
                          });
                        }}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-3 pr-12"
                        placeholder="100000"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 dark:text-gray-400">₽</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Цена в BTC (автоматически)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={listingData.cryptoPrice}
                        readOnly
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white pr-12"
                        placeholder="0.000000"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 dark:text-gray-400">BTC</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Способы оплаты *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                      <label key={key} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={listingData.paymentMethods.includes(key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setListingData({
                                ...listingData,
                                paymentMethods: [...listingData.paymentMethods, key]
                              });
                            } else {
                              setListingData({
                                ...listingData,
                                paymentMethods: listingData.paymentMethods.filter(m => m !== key)
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {method.icon} {method.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {method.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Способы передачи товара *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={listingData.delivery.pickup}
                        onChange={(e) => setListingData({
                          ...listingData,
                          delivery: { ...listingData.delivery, pickup: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <span className="text-gray-900 dark:text-white">🏪 Самовывоз (бесплатно)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={listingData.delivery.delivery}
                        onChange={(e) => setListingData({
                          ...listingData,
                          delivery: { ...listingData.delivery, delivery: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <span className="text-gray-900 dark:text-white">🚚 Курьерская доставка</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={listingData.delivery.shipping}
                        onChange={(e) => setListingData({
                          ...listingData,
                          delivery: { ...listingData.delivery, shipping: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <span className="text-gray-900 dark:text-white">📦 Почтовая доставка</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Publish */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                🚀 Публикация объявления
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Предварительный просмотр
                  </h3>
                  
                  <div className="flex space-x-4">
                    {listingData.images.length > 0 && (
                      <img
                        className="w-32 h-32 object-cover rounded-lg"
                        src={listingData.images[0]}
                        alt="Превью"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {listingData.title || 'Название не указано'}
                      </h4>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {listingData.price ? `${parseInt(listingData.price).toLocaleString()} ₽` : 'Цена не указана'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        📍 {listingData.location}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {listingData.description.substring(0, 100)}
                        {listingData.description.length > 100 && '...'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Рекомендации для успешной продажи
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>✅ Добавьте качественные фотографии со всех сторон</li>
                    <li>✅ Укажите честное состояние товара</li>
                    <li>✅ Опишите все дефекты и особенности</li>
                    <li>✅ Установите конкурентную цену</li>
                    <li>✅ Быстро отвечайте на сообщения покупателей</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="terms" className="rounded" />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                    Я согласен с <a href="#" className="text-purple-600 hover:text-purple-800">правилами размещения</a> и 
                    <a href="#" className="text-purple-600 hover:text-purple-800"> пользовательским соглашением</a>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Назад
            </button>
            
            {step < 5 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !listingData.category) ||
                  (step === 2 && (!listingData.title || !listingData.description)) ||
                  (step === 3 && listingData.images.length === 0) ||
                  (step === 4 && (!listingData.price || listingData.paymentMethods.length === 0))
                }
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold"
              >
                🚀 Опубликовать объявление
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Page Component
export const ChatPage = () => {
  const { userId } = useParams();
  const { user } = useContext(AppContext);
  const [selectedChat, setSelectedChat] = useState(userId || '102');
  const [messageText, setMessageText] = useState('');

  const chatList = [
    {
      id: '102',
      name: 'Tesla Center Moscow',
      avatar: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=100&h=100&fit=crop',
      lastMessage: 'Доступен тест-драйв на этой неделе',
      lastTime: '10:30',
      unread: 2,
      online: true
    },
    {
      id: '104',
      name: 'AI Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Готов приступить к разработке',
      lastTime: 'Вчера',
      unread: 0,
      online: false
    },
    {
      id: '106',
      name: 'Apple Premium Reseller',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      lastMessage: 'MacBook в наличии, можете забрать',
      lastTime: '2 дня назад',
      unread: 1,
      online: true
    }
  ];

  const messages = {
    '102': [
      { id: 1, senderId: '102', text: 'Здравствуйте! Интересует Tesla Model S?', time: '10:15', type: 'text' },
      { id: 2, senderId: user.id, text: 'Да, хотел бы узнать подробности', time: '10:16', type: 'text' },
      { id: 3, senderId: '102', text: 'Отличный выбор! Автомобиль в идеальном состоянии, пробег всего 2500 км', time: '10:17', type: 'text' },
      { id: 4, senderId: user.id, text: 'Можно посмотреть вживую?', time: '10:18', type: 'text' },
      { id: 5, senderId: '102', text: 'Конечно! Доступен тест-драйв на этой неделе. Когда вам удобно?', time: '10:30', type: 'text' }
    ],
    '104': [
      { id: 1, senderId: '104', text: 'Добро пожаловать! Готов обсудить разработку AI-чатбота', time: 'Вчера', type: 'text' },
      { id: 2, senderId: user.id, text: 'Отлично! Какие у вас есть примеры работ?', time: 'Вчера', type: 'text' },
      { id: 3, senderId: '104', text: 'Готов приступить к разработке', time: 'Вчера', type: 'text' }
    ],
    '106': [
      { id: 1, senderId: user.id, text: 'Здравствуйте! MacBook Pro M3 еще доступен?', time: '2 дня назад', type: 'text' },
      { id: 2, senderId: '106', text: 'MacBook в наличии, можете забрать', time: '2 дня назад', type: 'text' }
    ]
  };

  const currentChat = chatList.find(chat => chat.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const sendMessage = () => {
    if (messageText.trim()) {
      // В реальном приложении здесь была бы отправка на сервер
      console.log('Отправка сообщения:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            💬 Сообщения
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedChat === chat.id ? 'bg-purple-50 dark:bg-purple-900/20 border-r-2 border-r-purple-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={chat.avatar}
                    alt={chat.name}
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {chat.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {chat.lastTime}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={currentChat.avatar}
                    alt={currentChat.name}
                  />
                  {currentChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentChat.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentChat.online ? 'В сети' : 'Не в сети'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === user.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user.id ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Выберите чат
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Выберите собеседника из списка слева
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};