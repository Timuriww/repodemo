// Extended Mock Data for Full Marketplace
export const EXTENDED_LISTINGS = [
  // Electronics
  {
    id: 1,
    title: 'iPhone 15 Pro 128GB Space Black',
    price: 149990,
    cryptoPrice: 0.038,
    originalPrice: 159990,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1603802378047-a3d2b6b4c22c?w=600&h=400&fit=crop'
    ],
    location: 'Москва, м. Китай-город',
    time: '30 мин назад',
    category: 'electronics',
    subcategory: 'smartphones',
    featured: true,
    inStock: true,
    quantity: 5,
    features: ['Официальная гарантия', 'Новый', 'В наличии'],
    rating: 4.9,
    views: 2847,
    description: 'Новый iPhone 15 Pro 128GB в цвете Space Black. Официальная российская версия с полной гарантией Apple на 1 год. В комплекте: телефон, кабель USB-C to USB-C, документация. Проверка при получении, возможен обмен в течение 14 дней.',
    specifications: {
      'Диагональ экрана': '6.1"',
      'Процессор': 'Apple A17 Pro',
      'Память': '128 ГБ',
      'Камера': '48 Мп',
      'Операционная система': 'iOS 17'
    },
    seller: {
      id: 101,
      name: 'TechStore Official',
      rating: 4.8,
      reviewsCount: 1247,
      verified: true,
      responseTime: '< 1 часа',
      avatar: 'https://images.unsplash.com/photo-1560472355-a9a6b88a8103?w=100&h=100&fit=crop'
    },
    shipping: {
      free: true,
      methods: ['Курьер', 'Самовывоз', 'Почта России'],
      time: '1-2 дня'
    },
    paymentMethods: ['card', 'cash', 'crypto'],
    reviews: [
      { id: 1, user: 'Андрей М.', rating: 5, text: 'Отличный телефон, быстрая доставка!', date: '2 дня назад' },
      { id: 2, user: 'Мария К.', rating: 5, text: 'Всё как описано, рекомендую продавца', date: '1 неделя назад' }
    ]
  },
  
  // Cars
  {
    id: 2,
    title: 'Tesla Model S Plaid 2024',
    price: 8500000,
    cryptoPrice: 2.15,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop'
    ],
    location: 'Москва, СВАО',
    time: '2 часа назад',
    category: 'cars',
    subcategory: 'electric',
    featured: true,
    inStock: true,
    quantity: 1,
    features: ['3D Просмотр', 'Тест-драйв', 'Автопилот', 'Crypto OK'],
    rating: 5.0,
    views: 5420,
    description: 'Tesla Model S Plaid 2024 года в максимальной комплектации. Автопилот FSD, премиум интерьер, панорамная крыша. Пробег 2,500 км. Официальный дилер Tesla в России. Полная документация, техосмотр пройден.',
    specifications: {
      'Год выпуска': '2024',
      'Пробег': '2,500 км',
      'Двигатель': 'Электро, 1020 л.с.',
      'Разгон 0-100': '1.9 сек',
      'Запас хода': '637 км'
    },
    seller: {
      id: 102,
      name: 'Tesla Center Moscow',
      rating: 4.9,
      reviewsCount: 342,
      verified: true,
      responseTime: '< 30 мин',
      avatar: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=100&h=100&fit=crop'
    },
    shipping: {
      free: false,
      methods: ['Самовывоз', 'Доставка на дом'],
      time: 'По договоренности'
    },
    paymentMethods: ['card', 'crypto', 'trade'],
    reviews: []
  },

  // Real Estate
  {
    id: 3,
    title: 'Пентхаус 200м² с террасой в Москва-Сити',
    price: 45000000,
    cryptoPrice: 11.4,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop'
    ],
    location: 'Москва, Москва-Сити',
    time: '1 день назад',
    category: 'realestate',
    subcategory: 'apartments',
    featured: true,
    inStock: true,
    quantity: 1,
    features: ['VR-тур', 'Умный дом', 'Панорамные окна', 'Парковка'],
    rating: 5.0,
    views: 8934,
    description: 'Роскошный пентхаус на 60 этаже башни Федерация. Панорамные окна на 360°, терраса 50м², система умный дом. Дизайнерский ремонт от студии Pininfarina. Подземный паркинг на 2 машины включен.',
    specifications: {
      'Площадь': '200 м²',
      'Комнаты': '4+1',
      'Этаж': '60/67',
      'Терраса': '50 м²',
      'Парковка': '2 места'
    },
    seller: {
      id: 103,
      name: 'Элитная недвижимость',
      rating: 4.7,
      reviewsCount: 89,
      verified: true,
      responseTime: '< 2 часа',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'
    },
    shipping: {
      free: true,
      methods: ['Просмотр', 'VR-тур'],
      time: 'По записи'
    },
    paymentMethods: ['card', 'crypto', 'mortgage'],
    reviews: []
  },

  // Services
  {
    id: 4,
    title: 'Разработка AI-чатбота для бизнеса',
    price: 150000,
    cryptoPrice: 0.038,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    location: 'Удаленно',
    time: '3 часа назад',
    category: 'services',
    subcategory: 'ai-development',
    featured: false,
    inStock: true,
    quantity: 999,
    features: ['AI-технологии', 'Гарантия результата', 'Техподдержка'],
    rating: 4.9,
    views: 423,
    description: 'Создание умного чатбота с использованием GPT-4 для автоматизации клиентского сервиса. Интеграция с Telegram, WhatsApp, веб-сайтом. Обучение на ваших данных, аналитика диалогов.',
    specifications: {
      'Срок выполнения': '14 дней',
      'Платформы': 'Telegram, WhatsApp, Web',
      'Языки': 'Русский, Английский',
      'Поддержка': '6 месяцев',
      'Обучение': 'Включено'
    },
    seller: {
      id: 104,
      name: 'AI Solutions',
      rating: 4.9,
      reviewsCount: 156,
      verified: true,
      responseTime: '< 15 мин',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    shipping: {
      free: true,
      methods: ['Удаленно'],
      time: '14 дней'
    },
    paymentMethods: ['card', 'crypto'],
    reviews: [
      { id: 1, user: 'ООО "Техно"', rating: 5, text: 'Отличная работа, чатбот превзошел ожидания!', date: '1 месяц назад' }
    ]
  },

  // NFT
  {
    id: 5,
    title: 'CryptoPunks Collection #7841',
    price: 2500000,
    cryptoPrice: 0.63,
    image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=600&h=400&fit=crop',
    location: 'Блокчейн Ethereum',
    time: '1 час назад',
    category: 'nft',
    subcategory: 'art',
    featured: true,
    inStock: true,
    quantity: 1,
    features: ['Блокчейн верификация', 'Роялти 5%', 'Rare'],
    rating: 4.6,
    views: 1842,
    description: 'Редкий CryptoPunk из оригинальной коллекции 10,000 NFT. Уникальные черты: золотая цепь, кепка, очки. Подтвержденная подлинность на OpenSea. История всех транзакций доступна.',
    specifications: {
      'Коллекция': 'CryptoPunks',
      'Номер': '#7841',
      'Blockchain': 'Ethereum',
      'Стандарт': 'ERC-721',
      'Редкость': '0.3%'
    },
    seller: {
      id: 105,
      name: 'CryptoArt Gallery',
      rating: 4.6,
      reviewsCount: 78,
      verified: true,
      responseTime: '< 1 час',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    },
    shipping: {
      free: true,
      methods: ['Blockchain transfer'],
      time: 'Мгновенно'
    },
    paymentMethods: ['crypto'],
    reviews: []
  },

  // More products...
  {
    id: 6,
    title: 'MacBook Pro 16" M3 Max 1TB',
    price: 345000,
    cryptoPrice: 0.087,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop',
    location: 'Санкт-Петербург',
    time: '5 часов назад',
    category: 'electronics',
    subcategory: 'laptops',
    featured: false,
    inStock: true,
    quantity: 3,
    features: ['Apple гарантия', 'M3 Max', 'Новый'],
    rating: 4.8,
    views: 1234,
    description: 'MacBook Pro 16-дюймов с чипом M3 Max и накопителем 1TB. Идеален для профессиональной работы с видео, 3D-моделированием и разработкой.',
    seller: {
      id: 106,
      name: 'Apple Premium Reseller',
      rating: 4.9,
      reviewsCount: 892,
      verified: true,
      responseTime: '< 30 мин'
    },
    paymentMethods: ['card', 'crypto', 'installment']
  },

  {
    id: 7,
    title: 'BMW X5 xDrive40i 2023',
    price: 6200000,
    cryptoPrice: 1.57,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    location: 'Екатеринбург',
    time: '1 день назад',
    category: 'cars',
    subcategory: 'suv',
    featured: false,
    inStock: true,
    quantity: 1,
    features: ['Официальный дилер', 'Гарантия', 'Один владелец'],
    rating: 4.7,
    views: 3456,
    description: 'BMW X5 в максимальной комплектации. Один владелец, полная история обслуживания у официального дилера.',
    seller: {
      id: 107,
      name: 'BMW Центр Екатеринбург',
      rating: 4.8,
      reviewsCount: 234,
      verified: true,
      responseTime: '< 1 час'
    },
    paymentMethods: ['card', 'crypto', 'trade']
  },

  {
    id: 8,
    title: 'Дизайнерский диван Minotti',
    price: 450000,
    cryptoPrice: 0.114,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    location: 'Москва, ЦАО',
    time: '2 дня назад',
    category: 'furniture',
    subcategory: 'sofas',
    featured: false,
    inStock: true,
    quantity: 1,
    features: ['Итальянский дизайн', 'Кожа премиум', 'AR-примерка'],
    rating: 4.5,
    views: 567,
    description: 'Роскошный модульный диван от итальянского бренда Minotti. Натуральная кожа, ручная работа.',
    seller: {
      id: 108,
      name: 'Luxury Furniture',
      rating: 4.6,
      reviewsCount: 45,
      verified: true,
      responseTime: '< 2 часа'
    },
    paymentMethods: ['card', 'crypto']
  }
];

export const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Все категории', 
    icon: '🛍️',
    subcategories: []
  },
  { 
    id: 'electronics', 
    name: 'Электроника', 
    icon: '📱',
    subcategories: [
      { id: 'smartphones', name: 'Смартфоны' },
      { id: 'laptops', name: 'Ноутбуки' },
      { id: 'tablets', name: 'Планшеты' },
      { id: 'audio', name: 'Аудио' }
    ]
  },
  { 
    id: 'cars', 
    name: 'Автомобили', 
    icon: '🚗',
    subcategories: [
      { id: 'electric', name: 'Электромобили' },
      { id: 'suv', name: 'Внедорожники' },
      { id: 'sedan', name: 'Седаны' },
      { id: 'motorcycle', name: 'Мотоциклы' }
    ]
  },
  { 
    id: 'realestate', 
    name: 'Недвижимость', 
    icon: '🏠',
    subcategories: [
      { id: 'apartments', name: 'Квартиры' },
      { id: 'houses', name: 'Дома' },
      { id: 'commercial', name: 'Коммерческая' },
      { id: 'land', name: 'Участки' }
    ]
  },
  { 
    id: 'services', 
    name: 'Услуги', 
    icon: '🔧',
    subcategories: [
      { id: 'ai-development', name: 'AI-разработка' },
      { id: 'design', name: 'Дизайн' },
      { id: 'marketing', name: 'Маркетинг' },
      { id: 'repair', name: 'Ремонт' }
    ]
  },
  { 
    id: 'nft', 
    name: 'NFT & Цифровое', 
    icon: '🎨',
    subcategories: [
      { id: 'art', name: 'Цифровое искусство' },
      { id: 'collectibles', name: 'Коллекционные' },
      { id: 'games', name: 'Игровые NFT' },
      { id: 'music', name: 'Музыка' }
    ]
  },
  { 
    id: 'furniture', 
    name: 'Мебель', 
    icon: '🛋️',
    subcategories: [
      { id: 'sofas', name: 'Диваны' },
      { id: 'tables', name: 'Столы' },
      { id: 'chairs', name: 'Стулья' },
      { id: 'bedroom', name: 'Спальня' }
    ]
  },
  { 
    id: 'fashion', 
    name: 'Мода', 
    icon: '👗',
    subcategories: [
      { id: 'clothing', name: 'Одежда' },
      { id: 'shoes', name: 'Обувь' },
      { id: 'accessories', name: 'Аксессуары' },
      { id: 'bags', name: 'Сумки' }
    ]
  }
];

export const PAYMENT_METHODS = {
  card: {
    name: 'Банковская карта',
    icon: '💳',
    description: 'Visa, MasterCard, Мир',
    fee: 0,
    instant: true
  },
  crypto: {
    name: 'Криптовалюта',
    icon: '₿',
    description: 'Bitcoin, Ethereum, USDT',
    fee: 0.5,
    instant: true
  },
  cash: {
    name: 'Наличные',
    icon: '💵',
    description: 'При получении',
    fee: 0,
    instant: false
  },
  installment: {
    name: 'Рассрочка',
    icon: '📅',
    description: 'На 6-24 месяца',
    fee: 3,
    instant: false
  },
  trade: {
    name: 'Обмен',
    icon: '🔄',
    description: 'Обмен на другой товар',
    fee: 0,
    instant: false
  },
  mortgage: {
    name: 'Ипотека',
    icon: '🏦',
    description: 'Ипотечный кредит',
    fee: 1,
    instant: false
  }
};

export const CRYPTO_RATES = {
  BTC: 3950000, // 1 BTC = 3,950,000 RUB
  ETH: 250000,  // 1 ETH = 250,000 RUB
  USDT: 92      // 1 USDT = 92 RUB
};