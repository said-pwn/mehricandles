import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

export default function SolidPerfumeTutorial() {
  const { texts } = useContext(LanguageContext);

  const steps = [
    {
      title: texts.clearLeatherTitle,
      description: texts.clearLeatherDesc,
    },
    {
      title: texts.takeSmallAmountTitle,
      description: texts.takeSmallAmountDesc,
    },
    {
      title: texts.applyToPulsePointsTitle,
      description: texts.applyToPulsePointsDesc,
    },
    {
      title: texts.rubGentlyTitle,
      description: texts.rubGentlyDesc,
    },
    {
      title: texts.enjoyScentTitle,
      description: texts.enjoyScentDesc,
    },
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, type: "spring", stiffness: 80 },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-12 text-gray-900 text-center lg:text-left">
        {texts.howUseTitle}
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl">
        {/* Левый блок с шагами */}
        <div className="lg:w-1/2 w-full space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stepVariants}
              className="bg-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow border-l-8 border-blue-900 relative overflow-hidden group"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-full opacity-30 animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
              <p className="text-gray-700">{step.description}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-blue-200 opacity-0 group-hover:opacity-20 transition-opacity rounded-3xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Правый блок с fallback видео */}
        <div className="lg:w-1/2 w-full flex justify-center relative">
          <div className="overflow-hidden rounded-3xl shadow-3xl border border-gray-200 h-[650px] w-[330px] lg:h-[750px] lg:w-[360px] relative bg-gray-100 flex items-center justify-center">
            <video
              src="../src/assets/fallback.mp4"
              className="h-full w-full object-cover rounded-3xl"
              autoPlay
              loop
              muted
              playsInline
              poster="../src/assets/uzb.png"
            >
              {/* fallback */}
              <div className="flex flex-col items-center justify-center text-center px-4">
                <img
                  src="../src/assets/uzb.png"
                  alt={texts.videoAlt}
                  className="rounded-3xl mb-4 shadow-lg"
                />
                <p className="text-gray-700 font-medium">
                  {texts.videoFallbackMessage}
                </p>
              </div>
            </video>
            {/* Градиентная подсветка */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 to-pink-300/20 rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
