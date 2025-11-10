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
