import React, { useState, useEffect } from "react";

export default function BlogForm({ onSubmit, editingPost }) {
  const [title, setTitle] = useState(editingPost?.title || "");
  const [text, setText] = useState(editingPost?.text || "");
  const [image, setImage] = useState(editingPost?.image || null);

  useEffect(() => {
    setTitle(editingPost?.title || "");
    setText(editingPost?.text || "");
    setImage(editingPost?.image || null);
  }, [editingPost]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !text) return alert("Введите заголовок и текст");
    onSubmit({
      id: editingPost?.id || Date.now().toString(),
      title,
      text,
      image,
      likes: editingPost?.likes || 0,
      likedBy: editingPost?.likedBy || [],
      createdAt: editingPost?.createdAt || new Date().toISOString(),
    });
    setTitle("");
    setText("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Текст поста"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
      {image && <img src={image} alt="preview" className="w-32 h-32 object-cover mb-2" />}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {editingPost ? "Обновить пост" : "Добавить пост"}
      </button>
    </form>
  );
}
