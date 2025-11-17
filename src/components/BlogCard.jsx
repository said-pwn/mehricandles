import React, { useState, useEffect } from "react";
import { likePost } from "../services/blogApi";
import { FaHeart } from "react-icons/fa";

export default function BlogCard({ post, onLike }) {
  let userId = localStorage.getItem("user_id");
  if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("user_id", userId);
  }

  const [liked, setLiked] = useState(post.likedBy?.includes(userId));

  const handleLike = async () => {
    if (!liked) {
      await likePost(post.id, userId);
      setLiked(true);
      onLike();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
      {post.image && <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4 truncate-lines-3">{post.text}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded transition ${
              liked ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
            }`}
          >
            <FaHeart /> {post.likes || 0}
          </button>
          <span className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
