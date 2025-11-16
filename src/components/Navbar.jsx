import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Globe, Menu, X, Search, AlignLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
FaInstagram,
FaTelegram,
FaShoppingCart,
FaInfoCircle,
} from "react-icons/fa";
import { BiCategory, BiInfoCircle } from "react-icons/bi";
import { LanguageContext } from "../context/LanguageContext";
import Cart from "../Pages/Cart";
import FeaturedProducts from "./FeaturedProducts";

const Navbar = () => {
const { language, texts, changeLanguage } = useContext(LanguageContext);
const [languageOpen, setLanguageOpen] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [cartOpen, setCartOpen] = useState(false);
const [cartCount, setCartCount] = useState(0);
const [searchTerm, setSearchTerm] = useState("");
const [showSearch, setShowSearch] = useState(false);
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
setCartCount(cart.length);

const handleCartUpdate = (e) => setCartCount(e.detail.length);
window.addEventListener("cartUpdated", handleCartUpdate);
return () => window.removeEventListener("cartUpdated", handleCartUpdate);

}, []);

const links = [
{ to: "/", label: texts.main, icon: <Home className="text-blue-500 text-2xl" /> },
{ to: "/about", label: texts.learnourstory, icon: <BiInfoCircle  className="text-blue-500 text-2xl" /> },
{ to: "/catalog", label: texts.category, icon: <BiCategory className="text-blue-500 text-2xl" /> },
];

useEffect(() => {
document.body.style.overflow = menuOpen ? "hidden" : "";
}, [menuOpen]);

const handleLangSelect = (lang) => {
changeLanguage(lang);
setLanguageOpen(false);
};

// ------------------ Language Dropdown ------------------
const LanguageDropdown = () => ( <div className="relative">
<button
className="border border-gray-300 px-4 py-1.5 rounded-2xl cursor-pointer text-sm lg:text-base flex items-center justify-center gap-2
bg-white hover:bg-gray-100 text-gray-700 font-medium shadow-sm
transition-all duration-300 hover:shadow-md active:scale-95"
onClick={() => setLanguageOpen(!languageOpen)}
>
{language} </button>


  {languageOpen && (
    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-24">
      {["RU", "UZ", "EN"].map((lang) => (
        <button
          key={lang}
          onClick={() => handleLangSelect(lang)}
          className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
            language === lang ? "font-bold text-blue-500" : ""
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )}
</div>


);
// --------------------------------------------------------

return (
<>
{/* Верхний навбар */} <nav className="hidden md:flex  bg-gray-300 px-4  sm:px-6 lg:px-8 py-4"> <div className="max-w-7xl mx-auto flex items-center justify-between w-full"> <Link to="/" className="relative text-xl lg:text-2xl font-bold text-black/70">
𝑀𝑒𝒽𝓇𝒾𝒸𝒶𝓃𝒹𝓁𝑒𝓈.𝓊𝓏</Link>

<Link
                to="/catalog"
                className="flex items-center gap-2  px-3 py-1 border-gray-300  hover:text-blue-500 transition text-sm lg:text-base ml-210"
              >
                <BiCategory size={30} />
               
              </Link>

      <div className="ml-auto flex gap-4 items-center">
        {/* Search */}
        <div className="hidden md:block relative">
         
        </div>

        <LanguageDropdown />

        <a
          href="https://www.instagram.com/mehricandles/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            className="text-pink-500 hover:text-pink-600 transition duration-300"
            size={35} 
          />
        </a>

        <a
          href="https://t.me/mehricandles"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram
            className="text-blue-500 hover:text-blue-600 transition duration-300"
            size={35}
          />
        </a>

         
        

        {/* 🛒 Кнопка корзины */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center justify-center cursor-pointer"
        >
        
          <FaShoppingCart
            className="text-gray-700 hover:text-blue-500 transition duration-300"
            size={28} 
          />
          
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
            
          )}
        </button>
      </div>
    </div>
  </nav>

  {/* Мобильная шапка */}
  <div className="md:hidden flex bg-gray-300 items-center justify-between pl-2 py-3 border-b border-gray-300">
    <button onClick={() => setMenuOpen(true)}>
      <Menu size={26} />
    </button>

    <div className="flex  pl-4 gap-2 items-center">
      <Link to="/" className="text-xl font-bold">
        𝑀𝑒𝒽𝓇𝒾𝒸𝒶𝓃𝒹𝓁𝑒𝓈.𝓊𝓏
      </Link>
      <a
        href="https://www.instagram.com/mehricandles/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram
          className="text-pink-500 hover:text-pink-600 transition duration-300"
          size={25}
        />
      </a>
      <a
        href="https://t.me/mehricandles"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTelegram
          className="text-blue-500 hover:text-blue-600 transition duration-300"
          size={25}
        />
      </a>
    </div>
    <div className="w-6" />
  </div>

  {/* Боковое меню */}
  <AnimatePresence>
    {menuOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
        />
        <motion.div
          className="fixed left-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 flex flex-col"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
        
          <button className="self-end p-4" onClick={() => setMenuOpen(false)}>
            <X size={26} />
          </button>
          <div className="flex flex-col gap-3 px-4">
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  location.pathname === to
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  {/* <FeaturedProducts/> */}

  {/* Нижнее меню для мобильных */}
  <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2 md:hidden z-40">
    <Link to="/" className="flex flex-col items-center text-gray-700">
      <Home size={22} />
      <span className="text-xs">{texts.main}</span>
    </Link>

    <Link to="/catalog" className="flex flex-col items-center text-gray-700">
      <BiCategory size={30} />
      <span className="text-xs">{texts.category}</span>
    </Link>

    


    <button
      onClick={() => setCartOpen(true)}
      className="relative flex flex-col items-center justify-center text-gray-700"
    >
      <FaShoppingCart size={26} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-3 bg-blue-500 text-white text-xs font-bold px-1.5 py-1 rounded-full">
          {cartCount}
        </span>
      )}
      <span className="text-xs">{texts.cart || "Cart"}</span>
    </button>

    <div className="relative">
      <button
        className="flex flex-col items-center text-gray-700"
        onClick={() => setLanguageOpen(!languageOpen)}
      >
        <Globe size={22} />
        <span className="text-xs">{language}</span>
      </button>
      

      {languageOpen && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-24">
          {["RU", "UZ", "EN"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangSelect(lang)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                language === lang ? "font-bold text-blue-500" : ""
              }`}
            >
              {lang}
            </button>
          ))}
          
        </div>
      )}
      
    </div>
  </div>
  

  <Cart open={cartOpen} setOpen={setCartOpen} />
</>

);
};

export default Navbar;
