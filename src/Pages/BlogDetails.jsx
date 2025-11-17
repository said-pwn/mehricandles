import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getPostById, likePost } from "../services/blogApi";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const userId = localStorage.getItem("user_id") || Date.now().toString();
  if (!localStorage.getItem("user_id")) localStorage.setItem("user_id", userId);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
        setLiked(data?.likedBy?.includes(userId) || false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id, userId]);

  const handleLike = async () => {
    if (!post || liked) return;
    const updated = await likePost(post.id, userId);
    setPost(updated);
    setLiked(true);
  };

  if (loading) return <p className="text-center mt-10">Загрузка...</p>;
  if (!post) return <p className="text-center mt-10">Пост не найден</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 overflow-hidden">
      <button onClick={() => navigate(-1)} className="mb-4 px-3 py-1 border rounded hover:bg-gray-200">
        ← Назад
      </button>

      {post.image && <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded mb-6" />}
      <h1 className="text-3xl font-bold mb-4 break-words">{post.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-6 break-words whitespace-pre-wrap">{post.text}</p>

      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-1 rounded ${
          liked ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
        }`}
      >
        <FaHeart /> {post.likes || 0}
      </button>
    </div>
  );
}
