// src/services/auth.js
const ADMIN_USERNAME = "mehricandlesShop";
const ADMIN_PASSWORD = "0EMSQvbO8PY4i4gP"; // В продакшене используйте хеширование!

class AuthService {
  login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = btoa(`${username}:${Date.now()}`);
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify({ username, role: "admin" }));
      return { success: true, token };
    }
    return { success: false, error: "Неверный логин или пароль" };
  }

  logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  }

  isAuthenticated() {
    return !!localStorage.getItem("adminToken");
  }

  getCurrentUser() {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();

