// src/services/blogApi.js

export const getPosts = async () => {
  const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
  return posts;
};

export const addPost = async (post) => {
  const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
  posts.push(post);
  localStorage.setItem("blog_posts", JSON.stringify(posts));
  return post;
};

export const updatePost = async (updatedPost) => {
  const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
  const newPosts = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
  localStorage.setItem("blog_posts", JSON.stringify(newPosts));
  return updatedPost;
};

export const deletePost = async (id) => {
  const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
  const newPosts = posts.filter((p) => p.id !== id);
  localStorage.setItem("blog_posts", JSON.stringify(newPosts));
  return true;
};

export const likePost = async (postId, userId) => {
  const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
  const newPosts = posts.map((post) => {
    if (post.id === postId) {
      if (!post.likedBy) post.likedBy = [];
      if (!post.likedBy.includes(userId)) {
        post.likedBy.push(userId);
        post.likes = (post.likes || 0) + 1;
      }
    }
    return post;
  });
  localStorage.setItem("blog_posts", JSON.stringify(newPosts));
  return newPosts.find((p) => p.id === postId);
};
