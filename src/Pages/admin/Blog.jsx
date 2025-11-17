import React, { useEffect, useState } from "react";
import { getPosts, addPost, updatePost, deletePost } from "../../services/blogApi";
import BlogForm from "../../components/admin/BlogForm";
import { toast } from "react-toastify";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => { loadPosts(); }, []);

  const handleSubmit = async (post) => {
    if (editingPost) {
      await updatePost(post);
      toast.success("Пост обновлён");
    } else {
      await addPost(post);
      toast.success("Пост добавлен");
    }
    setEditingPost(null);
    loadPosts();
  };

  const handleEdit = (post) => setEditingPost(post);

  const handleDelete = async (id) => {
    if (window.confirm("Удалить пост?")) {
      await deletePost(id);
      toast.success("Пост удалён");
      loadPosts();
    }
  };

  return (
    <div className="p-6">
      <BlogForm onSubmit={handleSubmit} editingPost={editingPost} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded p-4">
            {post.image && <img src={post.image} alt={post.title} className="w-full h-40 object-cover mb-2 rounded" />}
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-gray-700 truncate-lines-3">{post.text}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => handleEdit(post)} className="bg-yellow-400 text-white px-2 py-1 rounded">Редактировать</button>
              <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white px-2 py-1 rounded">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
