// src/components/SocialLinks.jsx
import { Instagram, Send } from "lucide-react";

export default function SocialLinks() {
  const links = [
    {
      name: "Instagram",
      url: "https://instagram.com/yourprofile",
      icon: <Instagram size={24} />,
      bg: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
    },
    {
      name: "Telegram",
      url: "https://t.me/yourprofile",
      icon: <Send size={24} />,
      bg: "bg-blue-500",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-400 sm:flex-row items-center justify-center gap-4 mt-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg
            transition-transform transform hover:-translate-y-1 hover:shadow-2xl
            ${link.bg}
          `}
        >
          {link.icon}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
}
