const API_URL = "https://691a5ec52d8d7855756e87ba.mockapi.io/news";

export const getPosts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Ошибка загрузки постов");
  return res.json();
};

export const getPostById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export const addPost = async (post) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updatePost = async (post) => {
  const res = await fetch(`${API_URL}/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.ok;
};

export const likePost = async (postId, userId) => {
  const post = await getPostById(postId);
  if (!post.likedBy) post.likedBy = [];
  if (!post.likedBy.includes(userId)) {
    post.likedBy.push(userId);
    post.likes = (post.likes || 0) + 1;
    await updatePost(post);
  }
  return post;
};
