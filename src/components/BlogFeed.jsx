import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../services/blogApi";
import { useNavigate } from "react-router-dom";
import  "../index.css";
import { LanguageContext } from "../context/LanguageContext";

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const reload = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };
  const { texts } = useContext(LanguageContext);

  useEffect(() => { reload(); }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">{texts.loading}</p>;
  if (!posts.length) return <p className="text-center mt-10 text-gray-400">{texts.noblog}</p>;

  return (
    <div className="mt-10 container mx-auto px-4 mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{texts.blog}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {post.image && (
              <div className="relative overflow-hidden h-52">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mb-4 truncate-multiline flex-1">{post.text}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
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
