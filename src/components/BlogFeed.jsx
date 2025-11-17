import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../services/blogApi";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { LanguageContext } from "../context/LanguageContext";

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { texts } = useContext(LanguageContext);

  const reload = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 italic tracking-wide">
        {texts.loading}
      </p>
    );

  if (!posts.length)
    return (
      <p className="text-center mt-10 text-gray-400 italic tracking-wide">
        {texts.noblog}
      </p>
    );

  return (
    <div className="mt-14 container mx-auto px-4 mb-24 font-MyFont">

      {/* ░░ NYT Header ░░ */}
      <div className="text-center mb-14">
        <h1 className="text-[62px] md:text-[80px]   tracking-tight text-black">
          {texts.blog}
        </h1>

        <div className="mx-auto mt-3 w-40 border-b-[3px] border-black"></div>

        <p className="mt-4 text-gray-700 font-serif italic text-lg">
          {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* ░░ NYT Grid Layout ░░ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 bg-white shadow-sm 
            hover:shadow-md transition duration-300"
          >
            {/* Image */}
            {post.image && (
              <div className="h-60 overflow-hidden border-b border-gray-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover  transition-all duration-500 ease-in-out"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">

              {/* Title */}
              <h2 className="font-serif text-[28px] font-bold text-black leading-tight mb-3">
                {post.title}
              </h2>

              {/* Short text */}
              <p className="font-serif text-[17px] text-gray-800 leading-relaxed line-clamp-5 mb-6">
                {post.text}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center border-t pt-3 border-gray-300">
                <span className="text-sm text-gray-500 font-serif italic">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>

                <button
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="text-black font-serif font-semibold hover:underline"
                >
                  {texts.readmore} →
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
