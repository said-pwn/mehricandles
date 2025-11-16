import React, { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../context/LanguageContext";

import { FaInstagram } from "react-icons/fa";

export default function InstagramEmbed() {
  const embedRef = useRef(null);
  const { texts } = useContext(LanguageContext);

  const instagramLinks = [
    "https://www.instagram.com/reel/DP0p7k6gkpy/",
    "https://www.instagram.com/p/DO06QL2CH1t/",
    "https://www.instagram.com/reel/DCLmF8Ntdrz/"
  ];

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        window.instgrm && window.instgrm.Embeds.process();
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
    <div className="text-center mt-12">
      <h2 className="text-2xl font-semibold mb-4">{texts.ourinstagram}</h2>
   <p className="text-gray-600 flex items-center justify-center gap-2 mt-2 text-lg">
  {texts.followournew}

  <a
    href="https://www.instagram.com/mehricandles/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block transition-transform duration-300 hover:scale-125"
  >
    <FaInstagram className="text-pink-500 hover:text-pink-600" size={28} />
  </a>
</p>


    </div>
    <div ref={embedRef} className="flex flex-wrap justify-center gap-6 my-8">
      {instagramLinks.map((link, index) => (
        <blockquote
          key={index}
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={link}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: "2px solid #3897f0", // красивый синий бордер
            borderRadius: "16px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
            maxWidth: "360px",
            width: "100%",
            padding: "0",
            overflow: "hidden",
          }}
        >
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#3897f0",
              fontWeight: "600",
              display: "block",
              padding: "12px",
              textAlign: "center",
            }}
          >
            Смотреть этот пост в Instagram
          </a>
        </blockquote>
      ))}
    </div>
    </>
  );
}
