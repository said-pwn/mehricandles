import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useContext, useState } from "react";






export default function CandleDetails() {
    const location = useLocation();
  const { texts } = useContext(LanguageContext);

  const product = {
  name: "Candle 1",
  price:   texts.count,
  href: "#",

  images: [
    {
      src: "https://i.ibb.co/bfhswYk/IMG-5487.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    { id: "gray", name: "Gray", classes: "bg-gray-200 checked:outline-gray-400" },
    { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
  ],

  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};


  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Хлебные крошки */}
       

        {/* Контейнер с фото и описанием */}
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Фото */}
            <div className="flex justify-center items-start">
              <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-md">
                <img
                  alt={product.images[0].alt}
                  src={product.images[0].src}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Правая часть — инфо, отзывы, опции */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl text-gray-900">{product.price}</p>

             

             
             

              {/* Кнопки */}
              <div className="mt-10 flex flex-col gap-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  {texts.Add}
                </button>

                <Link
                  to="/catalog"
                  className="text-center w-full rounded-md border border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  {texts.back}
                </Link>
              </div>
            </div>
          </div>

          {/* Описание и детали ниже */}

           <div className="mt-16 max-w-3xl">
            <p className="text-base text-gray-900">{product.description}</p>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <ul
                role="list"
                className="list-disc space-y-2 pl-4 text-sm text-gray-600 mt-4"
              >
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <p className="mt-4 mb-10 text-sm text-gray-600">{product.details}</p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
