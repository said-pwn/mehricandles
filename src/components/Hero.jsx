import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import FeaturedProducts from "./FeaturedProducts";
import Blog from "./Blog";
import HowUse from "./HowUse";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { texts } = useContext(LanguageContext);

  return (
<>
    <section className="relative min-h-screen w-full flex flex-col md:flex-row">
      {/* 🖼 Левая часть — фоновое изображение */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto">
        <img
          src="https://i.ibb.co/bfhswYk/IMG-5487.jpg"
          alt="Candle light"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* затемнение для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

    
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-gradient-to-br from-black via-stone-900 to-black px-6 md:px-12 lg:px-20 py-16">
        <div className="h-1 w-16 bg-amber-900 rounded-full mb-6 mx-auto md:mx-0" />

        <h1 className="font-serif text-5xl sm:text-6xl font-light text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-tight">
          {texts.iluminate}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-stone-200 max-w-lg leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
          {texts.heroDescription}
        </p>

        

        <div className="flex flex-col mt-5 sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/catalog"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-4 bg-amber-900 text-stone-50 rounded-sm font-medium text-base transition-all duration-300 hover:bg-amber-950 hover:shadow-[0_0_25px_rgba(255,200,150,0.4)]"
          >
            <span className="flex items-center justify-center md:justify-start gap-2">
              {texts.shopcollection}
              <ChevronRight
                size={20}
                className={`transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </span>
          </Link>

          <Link
            to="/about"
            className="px-8 py-4 border-2 border-amber-900  text-amber-200 rounded-sm font-medium text-base transition-all duration-300 hover:bg-amber-900/20 hover:text-amber-100"
          >
            {texts.learnourstory}
          </Link>
        </div>
        

        {/* ⭐ Trust Indicators */}
        <div className="mt-12 max-w-md border border-stone-200/30 bg-black/50 backdrop-blur-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/30 text-center">
            <div className="flex flex-col justify-center items-center py-6 px-4">
              <p className="text-2xl font-light text-white">500+</p>
              <p className="text-xs tracking-wide text-white mt-1">{texts.happy}</p>
            </div>

            <div className="flex flex-col justify-center items-center py-6 px-4">
              <p className="text-2xl font-light text-white">100%</p>
              <p className="text-xs tracking-wide text-white mt-1">{texts.natural}</p>
            </div>

            

           

            <div className="flex flex-col justify-center items-center py-6 px-4">
              <p className="text-2xl font-light text-white">100%</p>
              <p className="text-xs tracking-wide text-white mt-1">{texts.madein}</p>
            </div>
          </div>
          
        </div>
      </div>
      
      

     
    </section>
    <FeaturedProducts />
    <Blog/>
    <HowUse/>
</>
  );
}
