import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getPosts, likePost } from "../services/blogApi";
import { LanguageContext } from "../context/LanguageContext";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { texts } = useContext(LanguageContext);

  const userId = localStorage.getItem("user_id") || Date.now().toString();

  useEffect(() => {
    if (!localStorage.getItem("user_id")) localStorage.setItem("user_id", userId);

    const loadPost = async () => {
      try {
        const posts = await getPosts();
        const found = posts.find((p) => p.id === id);
        setPost(found || null);
        setLiked(found?.likedBy?.includes(userId) || false);
      } catch (err) {
          console.error("Error loading post:", err);
          setPost(null);
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

  if (loading) return <p className="text-center mt-10 text-gray-600">{texts.loadinfposts}</p>;

  if (!post)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 text-lg mb-4">{texts.postnotfound}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          ← {texts.main}
        </button>
      </div>
    );

  const contentLines = post.text ? post.text.split("\n") : [];
  const previewLines = 8;
  const previewContent = expanded ? contentLines : contentLines.slice(0, previewLines);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        ← {texts.backmain}
      </button>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>

      <div className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-wrap break-words">
        {previewContent.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}

        {contentLines.length > previewLines && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 font-semibold mt-2 inline-block hover:underline"
          >
            {expanded ? "Collapse" : "...Show more"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1 rounded transition ${
            liked ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
          }`}
        >
          <FaHeart /> {post.likes || 0}
        </button>
        <span className="text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
