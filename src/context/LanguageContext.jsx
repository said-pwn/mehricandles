// src/context/LanguageContext.jsx
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
  },
  UZ: {
    category: "Katalog",
    main: "Asosiy",
    catalog: "Catalog",
    count: "Som",
    back: 'Katalogga qaytish',
    Add: "Savatchaga qo'shish",

  },
  EN: {
    category: "Catalog",
    main: "Home",
    catalog: "Catalog",
    count: "UZS",
    back: 'Back to catalog',
    Add: "Add to bag",
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
