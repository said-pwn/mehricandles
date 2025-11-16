import React, { useContext } from "react";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const Footer = () => {
  const { texts } = useContext(LanguageContext);

  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-gray-700 mt-10 shadow-inner ">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left: copyright */}
        <div className="text-sm md:text-base text-center md:text-left text-gray-600">
          © 2025 MehriCandles
        </div>

        {/* Middle: site navigation */}
        <nav className="flex flex-col md:flex-row gap-3 md:gap-6 text-sm md:text-base text-center md:text-left">
          <Link to="/" className="hover:text-indigo-600 transition duration-300 font-medium">{texts.main || "Главная"}</Link>
          <Link to="/catalog" className="hover:text-indigo-600 transition duration-300 font-medium">{texts.category || "Каталог"}</Link>
          <Link to="/about" className="hover:text-indigo-600 transition duration-300 font-medium">{texts.learnourstory || "О нас"}</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition duration-300 font-medium">{texts.contact || "Контакты"}</Link>
        </nav>

        {/* Right: social */}
        <div className="hidden  md:flex items-center justify-center md:justify-end gap-4">
          <span className="hidden md:inline text-gray-500">{texts.followus || "Следите за нами:"}</span>
          <a
            href="https://www.instagram.com/mehricandles/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition duration-300"
          >
            <FaInstagram className="text-pink-500 hover:text-pink-600" size={28} />
          </a>
          <a
            href="https://t.me/mehricandles"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition duration-300"
          >
            <FaTelegram className="text-blue-500 hover:text-blue-600" size={28} />
          </a>
        </div>
      </div>

      {/* Mobile small text for social */}

         
          <a
            href="https://www.instagram.com/mehricandles/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition duration-300 md:hidden ml-38 mb-18 inline-block"
          >
            <FaInstagram className="text-pink-500 hover:text-pink-600" size={28} />
          </a>
          <a
            href="https://t.me/mehricandles"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition duration-300 md:hidden ml-3 pb-18 inline-block"
          >
            <FaTelegram className="text-blue-500 hover:text-blue-600" size={28} />
          </a>
       
    
    </footer>
  );
};

export default Footer;
