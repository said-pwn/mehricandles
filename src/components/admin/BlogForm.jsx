// src/components/BlogForm.jsx
import React, { useState, useEffect } from "react";
import { addPost, updatePost } from "../services/blogApi";

const IMGUR_CLIENT_ID = "ТВОЙ_CLIENT_ID"; // нужно зарегистрировать бесплатный на Imgur

export default function BlogForm({ onSubmit, editingPost }) {
  const [title, setTitle] = useState(editingPost?.title || "");
  const [text, setText] = useState(editingPost?.text || "");
  const [image, setImage] = useState(editingPost?.image || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(editingPost?.title || "");
    setText(editingPost?.text || "");
    setImage(editingPost?.image || null);
  }, [editingPost]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file); // сохраняем как File
  };

  const uploadImageToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error("Ошибка загрузки изображения");
    return data.data.link;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return alert("Введите заголовок и текст");

    setLoading(true);
    try {
      let imageUrl = image;
      if (image instanceof File) {
        imageUrl = await uploadImageToImgur(image);
      }

      const postData = {
        id: editingPost?.id || Date.now().toString(),
        title,
        text,
        image: imageUrl,
        likes: editingPost?.likes || 0,
        likedBy: editingPost?.likedBy || [],
        createdAt: editingPost?.createdAt || new Date().toISOString(),
      };

      if (editingPost) {
        await updatePost(postData);
      } else {
        await addPost(postData);
      }

      onSubmit(postData);
      setTitle("");
      setText("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении поста");
    } finally {
      setLoading(false);
    }
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
      {image && !(image instanceof File) && (
        <img src={image} alt="preview" className="w-32 h-32 object-cover mb-2" />
      )}
      {image instanceof File && (
        <p className="text-gray-500 mb-2">Файл выбран: {image.name}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Сохраняем..." : editingPost ? "Обновить пост" : "Добавить пост"}
      </button>
    </form>
  );
}
