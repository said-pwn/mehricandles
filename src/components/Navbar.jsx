// Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation,  } from "react-router-dom";
import { Home, Globe, User, PlusCircle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar, FaInstagram, FaMotorcycle, FaTelegram, FaThLarge } from "react-icons/fa";
import { MdArticle, MdCategory } from "react-icons/md";
import { AiOutlineTool, AiOutlineFire, AiOutlineSetting } from "react-icons/ai";
// import IconCar from "./IconCar";
import { FiGrid, FiTruck } from "react-icons/fi";
import { IoCarSportOutline, IoGridOutline } from "react-icons/io5";
import { LanguageContext } from "../context/LanguageContext";
import { BiCategory } from "react-icons/bi";

const Navbar = () => {
  const { language, texts, changeLanguage } = useContext(LanguageContext);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();


  const links = [
    { to: "/", label: texts.cars, icon: <FaCar className="text-blue-500 text-2xl" /> },
    // { to: "/new", label: texts.newCars, icon: <IconCar /> },
    { to: "/parts", label: texts.parts, icon: <AiOutlineSetting className="text-blue-500 text-2xl" /> },
    { to: "/repair", label: texts.repair, icon: <AiOutlineTool className="text-blue-500 text-2xl" /> },
    { to: "/commercial", label: texts.commercial, icon: <FiTruck className="text-blue-500 text-2xl" /> },
    { to: "/read", label: texts.read, icon: <MdArticle className="text-blue-500 text-2xl" /> },
    { to: "/hot-offers", label: texts.hotOffers, icon: <AiOutlineFire className="text-blue-500 text-2xl" /> },
    { to: "/easy", label: texts.legkovye, icon: <IoCarSportOutline className="text-blue-500 text-2xl" /> },
    { to: "/moto", label: texts.mototechnika, icon: <FaMotorcycle className="text-blue-500 text-2xl" /> },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const handleLangSelect = (lang) => {
    changeLanguage(lang);
    setLanguageOpen(false);
  };

 

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // ------------------ Language Dropdown Component ------------------
  const LanguageDropdown = () => (
    <div className="relative">
     <button
  className="border border-gray-300 px-4 py-1.5 rounded-2xl cursor-pointer text-sm lg:text-base flex items-center justify-center gap-2 
             bg-white hover:bg-gray-100 text-gray-700 font-medium shadow-sm 
             transition-all duration-300 hover:shadow-md active:scale-95"
  onClick={() => setLanguageOpen(!languageOpen)}
>
  {language}
</button>

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
  // ------------------------------------------------------------------

  return (
    <>
      {/* Верхний навбар */}
      <nav className="hidden md:flex bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <Link to="/" className=" relative text-xl lg:text-2xl font-bold ">
            MehriCandles.uz
            
          </Link>

           <div className='ml-auto   flex gap-4 items-center'>
           <div className=" ">

            <LanguageDropdown />
          </div>
          
                  {/* Instagram */}
                  <a
                    href='https://www.instagram.com/mehricandles/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaInstagram className='text-pink-500 hover:text-pink-600 transition duration-300' size={35} />
                  </a>
          
                  {/* Telegram */}
                  <a
                    href='https://t.me/mehricandles' // <-- сюда вставь реальную ссылку на свой телеграм
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaTelegram className='text-blue-500 hover:text-blue-600 transition duration-300' size={35} />
                  </a>
                </div>
          
        </div>
      </nav>

      {/* Мобильная шапка */}
      <div className="md:hidden flex items-center justify-between pl-2 py-3 border-b border-gray-300">
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={26} />
        </button>
        
       <div className=' flex pl-4 gap-2 items-center'>
       <Link to="/" className="relative text-xl lg:text-2xl font-bold  items-center justify-center">
          MehriCandles.uz
          
          
        </Link>
               {/* Instagram */}
               <a className="ml-5"
                 href='https://www.instagram.com/mehricandles/'
                 target='_blank'
                 rel='noopener noreferrer'
               >
                 <FaInstagram className='text-pink-500 hover:text-pink-600 transition duration-300' size={25} />
               </a>
       
               {/* Telegram */}
               <a className="mr-auto "
                 href='https://t.me/mehricandles' // <-- сюда вставь реальную ссылку на свой телеграм
                 target='_blank'
                 rel='noopener noreferrer'
               >
                 <FaTelegram className='text-blue-500 hover:text-blue-600 transition duration-300' size={25} />
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

                {/* Mobile Language Dropdown */}
                {/* <LanguageDropdown /> */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Нижнее меню для мобильных */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2 md:hidden z-40">
        <Link to="/" className="flex flex-col items-center text-gray-700">
          <Home size={22} />
          <span className="text-xs">{texts.main}</span>
        </Link>

           <Link to="/catalog" className="flex flex-col items-center text-gray-700">
            <BiCategory size={30} className="text-gray-700" />
            <span className="text-xs">{texts.category}</span>
            {/* <span className="text-xs">{currentUser.nickname}</span> */}
            {/* <span>{texts.profile}</span> */}
          </Link>
        {/* Bottom Mobile Language Dropdown */}
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
    </>
  );
};

export default Navbar;
