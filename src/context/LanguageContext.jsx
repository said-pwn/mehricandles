// src/context/LanguageContext.jsx
import { Check } from "lucide-react";
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const translations = {
  RU: {
    category: "Каталог",
    main: "Home",
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
    shoppingCart: "Корзина",
    empty: "Корзина пуста",
    added: "Товар добавлен в корзину!",
    aded: "Добавлено!",
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
