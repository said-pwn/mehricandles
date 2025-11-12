// src/context/LanguageContext.jsx
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const translations = {
  RU: {
    category: "Каталог",
    main: "Главная",
    catalog: "Catalog",
    count: "Сум",
    back: 'Назад в каталог',
    Add: "Добавить в корзину",
    total: "Итого",
    shipping: "Стоимость доставки рассчитывается при оформлении заказа.",
    checkout: "Оформить заказ",
    continue: "Продолжить покупки",
    or: "или",
    remove: "Удалить",
    quantity: "Количество:",
    empty: "Корзина пуста",
    added: "Товар добавлен в корзину!",
    aded: "Добавлено!",
    cart: "Корзина",
    heroDescription: "Роскошные свечи ручной работы из премиального соевого воска. Создайте моменты спокойствия с нашей тщательно подобранной коллекцией изысканных ароматов.",
    hour: "48 Часов",
    happy: "Счастливые клиенты",
    natural: "Натуральные ингредиенты",
    delivery: "Время доставки",
    iluminate: "Осветите ваше пространство",
    freeshipping: "Бесплатная доставка при заказе от $50",
    shopcollection: "Наш каталог",
    learnourstory: "О нас",
    who: "Кто мы", 
    must: "* — Обязательный пункт заполнения",
    new: "Новинки",
    new2: "Новинка",
    hit: "Хит продаж",
    hit2: "Хит",
    loadingCatalog: "Загрузка каталога...",
    poumolchaniyu: "По умолчанию",
  findPerfectCandle: "Найдите идеальную свечу для вашего дома",
  searchPlaceholder: "Поиск по названию, описанию, аромату...",
  sortByDefault: "По умолчанию",
  sortByPriceAsc: "Цена: по возрастанию",
  sortByPriceDesc: "Цена: по убыванию",
  sortByNameAsc: "По названию (А-Я)",
  sortByNewest: "Сначала новые",
  allProducts: "Все товары",
  sales: "Акции",
  foundProducts: "Найдено товаров",
  noImage: "Нет изображения",
  sale: "Акция",
  aroma: "Аромат",
  notFound: "Товары не найдены",
  tryChangeFilters: "Попробуйте изменить параметры поиска или фильтры",
  resetFilters: "Сбросить фильтры",
  },
  UZ: {
    category: "Katalog",
    main: "Asosiy",
    catalog: "Catalog",
    count: "Som",
    back: 'Katalogga qaytish',
    Add: "Savatchaga qo'shish",
    shipping: "Yetkazib berish narxi buyurtma berishda hisoblanadi.",
    total: "Jami",
    checkout: "Buyurtma berish",
    continue: "Xaridni davom ettirish",
    or: "yoki",
    remove: "O'chirish",
    quantity: "Miqdor:",
    shoppingCart: "Savatcha",
    empty: "Savatcha bo'sh",
    added: "Mahsulot savatchaga qo'shildi!",  
    aded: "Qo'shildi!",
    cart: "Savatcha",
    heroDescription: "Premium soya mumi bilan qo'lda tayyorlangan hashamatli shamlar. Bizning tanlangan nozik hidlar to'plamimiz bilan tinchlik lahzalarini yarating.",
    hour: "48 Soat",
    happy: "Baxtli mijozlar",
    natural: "Tabiiy ingredientlar",
    delivery: "Yetkazib berish vaqti",
    iluminate: "O'zingizning makoningizni yoritib bering",
    freeshipping: "$50 dan ortiq buyurtmalarda bepul yetkazib berish",
    shopcollection: "Katalogimiz",
    learnourstory: "Bizni haqimizda",
    who: "Biz kimmiz",
    must: "* — Majburiy to'ldirish maydoni",
    new: "Yangi mahsulotlar",
    new2: "Yangi mahsulot",
    hit: "Eng ko'p sotilganlar",
    hit2: "Eng ko'p sotilgan",
    loadingCatalog: "Katalog yuklanmoqda...",
    poumolchaniyu: "Standart boʻyicha",
  "findPerfectCandle": "Uylaringiz uchun mukammal shamni toping",
  "searchPlaceholder": "Nomi, tavsifi yoki hidi bo‘yicha qidirish...",
  "sortByDefault": "Standart",
  "sortByPriceAsc": "Narx: pastdan yuqoriga",
  "sortByPriceDesc": "Narx: yuqoridan pastga",
  "sortByNameAsc": "Nom bo‘yicha (A–Z)",
  "sortByNewest": "Yangi mahsulotlar avval",
  "allProducts": "Barcha mahsulotlar",
  "bestsellers": "Eng ko‘p sotilganlar",
  "newArrivals": "Yangi kelganlar",
  "sales": "Aksiyalar",
  "foundProducts": "Topilgan mahsulotlar",
  "noImage": "Rasm mavjud emas",

  "sale": "Aksiya",
  "aroma": "Hid",
  "notFound": "Mahsulot topilmadi",
  "tryChangeFilters": "Qidiruv yoki filtrlarni o‘zgartirib ko‘ring",
  "resetFilters": "Filtrlarni tiklash",
  },
  EN: {
    category: "Catalog",
    main: "Home",
    catalog: "Catalog",
    count: "UZS",
    back: 'Back to catalog',
    Add: "Add to bag",
    shipping: "Shipping cost is calculated at checkout.",
    checkout: "Checkout",
    total: "subtotal",
    continue: "Continue shopping",
    or: "or",
    remove: "Remove",
    quantity: "Quantity:",
    shoppingCart: "Shopping Cart",
    empty: "Your cart is empty",
    added: "Product added to cart!",
    aded: "Added!",
    cart: "Cart",
    heroDescription: "Handcrafted luxury candles made from premium soy wax. Create moments of tranquility with our curated collection of fine scents.",
    hour: "48 Hours",
    happy: "Happy Customers",
    natural: "Natural Ingredients",
    delivery: "Delivery Time",
    iluminate: "Illuminate Your Space",
    freeshipping: "Free shipping on orders over $50",
    shopcollection: "Our catalog",
    learnourstory: "About us",
    who: "Who we are",
    must: "* — Required field",
    new: "New arrivals",
    new2: "New Arrival",
    hit: "Best sellers",
    hit2: "Bestseller",
    loadingCatalog: "Loading catalog...",
    poumolchaniyu: "By default",
 
  "findPerfectCandle": "Find the perfect candle for your home",
  "searchPlaceholder": "Search by name, description, or aroma...",
  "sortByDefault": "Default",
  "sortByPriceAsc": "Price: Low to High",
  "sortByPriceDesc": "Price: High to Low",
  "sortByNameAsc": "By Name (A–Z)",
  "sortByNewest": "Newest First",
  "allProducts": "All Products",
  "bestsellers": "Bestsellers",
  "newArrivals": "New Arrivals",
  "sales": "Sales",
  "foundProducts": "Products found",
  "noImage": "No image",
  "sale": "Sale",
  "aroma": "Aroma",
  "notFound": "No products found",
  "tryChangeFilters": "Try adjusting your search or filters",
  "resetFilters": "Reset filters",

  },
 
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("RU");
  const [texts, setTexts] = useState(translations["RU"]);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang.toUpperCase()]) {
      setLanguage(savedLang.toUpperCase());
      setTexts(translations[savedLang.toUpperCase()]);
    }
  }, []);

  const changeLanguage = (lang) => {
    const upperLang = lang.toUpperCase();
    if (translations[upperLang]) {
      setLanguage(upperLang);
      setTexts(translations[upperLang]);
      localStorage.setItem("language", upperLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, texts, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
