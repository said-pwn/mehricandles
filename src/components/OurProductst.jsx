import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { FaFire, FaGlassMartiniAlt, FaSoap, FaSpa } from "react-icons/fa";
import { GiCandleFlame, GiCandleLight, GiSoap } from "react-icons/gi";
import { BiCandles } from "react-icons/bi";
import { MdSoap } from "react-icons/md";

const OurProducts = () => {
  const { texts } = useContext(LanguageContext);


  const products = [
    {
      name: texts.solidperfume,
      link: "/solid-perfume",
    //   icon: <FaSoap size={40} color="#fbbf24" />,
      color: "bg-purple-100 hover:bg-purple-200",
    },
    {
      name: texts.candle,
      link: "/candle",
      icon: <GiCandleLight size={40} color="#fbbf24" />,
      color: "bg-orange-100 hover:bg-orange-200",
    },
    {
      name: texts.aromadefuzer,
      link: "/aroma-diffuser",
      icon: <FaSpa size={40} className="text-green-500" />,
      color: "bg-green-100 hover:bg-green-200",
    },
        {
      name: texts.candle,
      link: "/candle",
      icon: <GiCandleLight size={40} color="#fbbf24" />,
      color: "bg-orange-100 hover:bg-orange-200",
    },
        {
      name: texts.candle,
      link: "/candle",
      icon: <GiCandleLight size={40} color="#fbbf24" />,
      color: "bg-orange-100 hover:bg-orange-200",
    },
        {
      name: texts.candle,
      link: "/candle",
      icon: <GiCandleLight size={40} color="#fbbf24" />,
      color: "bg-orange-100 hover:bg-orange-200",
    },
    

  ];

  return (
    <div className=" min-h-screen bg-gray-400 py-20 font-MyFont mt-20">
      <h2 className="text-center text-4xl md:text-5xl  mb-12 text-gray-800 ">
        {texts.browseourrange}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <Link key={product.name} to={product.link}>
            <div
              className={`flex flex-col items-center justify-center ${product.color} rounded-2xl shadow-lg p-8 transform transition duration-300 hover:scale-105`}
            >
              <div className="mb-4">{product.icon}</div>
              <span className="text-xl font-semibold text-gray-800">{product.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
