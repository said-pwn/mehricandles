// src/services/api.js
const MOCKAPI_BASE_URL = "https://6912259c52a60f10c820c95e.mockapi.io/data"; // Замените на ваш MockAPI URL

// Для разработки используем localStorage как MockAPI
const isDevelopment = true;

class ApiService {
  // ========== PRODUCTS ==========
  async getProducts() {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      return products;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products`);
    return response.json();
  }

  async getProduct(id) {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      // Ищем товар по ID, сравнивая как число и как строку
      const productId = typeof id === 'string' ? parseInt(id) : id;
      return products.find(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId === productId;
      });
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products/${id}`);
    return response.json();
  }

  async createProduct(product) {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      // Генерируем ID как максимальный существующий ID + 1, или начинаем с 1
      const maxId = products.length > 0 
        ? Math.max(...products.map(p => typeof p.id === 'number' ? p.id : parseInt(p.id) || 0))
        : 0;
      const newProduct = {
        ...product,
        id: maxId + 1,
        createdAt: new Date().toISOString(),
      };
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
      return newProduct;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async updateProduct(id, product) {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const productId = typeof id === 'string' ? parseInt(id) : id;
      const index = products.findIndex(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId === productId;
      });
      if (index !== -1) {
        products[index] = { ...products[index], ...product, updatedAt: new Date().toISOString() };
        localStorage.setItem("products", JSON.stringify(products));
        return products[index];
      }
      return null;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async deleteProduct(id) {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const productId = typeof id === 'string' ? parseInt(id) : id;
      const filtered = products.filter(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId !== productId;
      });
      localStorage.setItem("products", JSON.stringify(filtered));
      return { success: true };
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  // ========== CATEGORIES ==========
  async getCategories() {
    if (isDevelopment) {
      return JSON.parse(localStorage.getItem("categories") || "[]");
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/categories`);
    return response.json();
  }

  async createCategory(category) {
    if (isDevelopment) {
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      const newCategory = { ...category, id: Date.now() };
      categories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(categories));
      return newCategory;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return response.json();
  }

  async updateCategory(id, category) {
    if (isDevelopment) {
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      const index = categories.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        categories[index] = { ...categories[index], ...category };
        localStorage.setItem("categories", JSON.stringify(categories));
        return categories[index];
      }
      return null;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return response.json();
  }

  async deleteCategory(id) {
    if (isDevelopment) {
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      const filtered = categories.filter(c => c.id !== parseInt(id));
      localStorage.setItem("categories", JSON.stringify(filtered));
      return { success: true };
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  // ========== ORDERS ==========
  async getOrders() {
    if (isDevelopment) {
      return JSON.parse(localStorage.getItem("orders") || "[]");
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders`);
    return response.json();
  }

  async getOrder(id) {
    if (isDevelopment) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      return orders.find(o => o.id === parseInt(id));
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders/${id}`);
    return response.json();
  }

  async updateOrderStatus(id, status) {
    if (isDevelopment) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const index = orders.findIndex(o => o.id === parseInt(id));
      if (index !== -1) {
        orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() };
        localStorage.setItem("orders", JSON.stringify(orders));
        return orders[index];
      }
      return null;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  // ========== USERS/CUSTOMERS ==========
  async getCustomers() {
    if (isDevelopment) {
      return JSON.parse(localStorage.getItem("customers") || "[]");
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/customers`);
    return response.json();
  }

  // ========== STATISTICS ==========
  async getStatistics() {
    if (isDevelopment) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const totalOrders = orders.length;
      const totalProducts = products.length;
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      
      return {
        totalRevenue,
        totalOrders,
        totalProducts,
        pendingOrders,
        ordersByStatus: {
          pending: orders.filter(o => o.status === "pending").length,
          processing: orders.filter(o => o.status === "processing").length,
          shipped: orders.filter(o => o.status === "shipped").length,
          delivered: orders.filter(o => o.status === "delivered").length,
        },
      };
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/statistics`);
    return response.json();
  }
}

export default new ApiService();

