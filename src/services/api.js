// src/services/api.js
const MOCKAPI_BASE_URL = "https://6912259c52a60f10c820c95e.mockapi.io"; // Замените на ваш MockAPI URL

// Для разработки используем localStorage как MockAPI
// Можно переключать через Vite env: VITE_API_MODE=local | remote
const envMode = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_MODE) || 'remote';
const isDevelopment = envMode === 'local';

class ApiService {
  // ========== PRODUCTS ==========
  async getProducts() {
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      return products;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
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
    if (!response.ok) throw new Error('Failed to fetch product');
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
    if (!response.ok) throw new Error('Failed to create product');
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
    if (!response.ok) throw new Error('Failed to update product');
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
    if (!response.ok) throw new Error('Failed to delete product');
    return { success: true };
  }

  // ========== CATEGORIES ==========
  async getCategories() {
    if (isDevelopment) {
      return JSON.parse(localStorage.getItem("categories") || "[]");
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/categories`);
    if (response.status === 404) return [];
    if (!response.ok) throw new Error('Failed to fetch categories');
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
    if (!response.ok) throw new Error('Failed to create category');
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
    if (!response.ok) throw new Error('Failed to update category');
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
    if (!response.ok) throw new Error('Failed to delete category');
    return { success: true };
  }

  // ========== ORDERS ==========
  async getOrders() {
    if (isDevelopment) {
      return JSON.parse(localStorage.getItem("orders") || "[]");
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders`);
    if (response.status === 404) return [];
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }

  async getOrder(id) {
    if (isDevelopment) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      return orders.find(o => o.id === parseInt(id));
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  }

  async createOrder(order) {
    if (isDevelopment) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = { ...order, id: Date.now(), createdAt: new Date().toISOString() };
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
      return newOrder;
    }
    const response = await fetch(`${MOCKAPI_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
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
    if (!response.ok) throw new Error('Failed to update order');
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
    // We remove dependency on orders; compute statistics from products and categories only
    if (isDevelopment) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      return this._aggregateProductStats(products, categories);
    }

    // Optionally allow overriding via VITE_STATS_API_URL if you still want to serve static stats
    const statsUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_STATS_API_URL) || '';
    if (statsUrl) {
      try {
        const res = await fetch(statsUrl);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            if (data.length > 0 && typeof data[0] === 'object') return data[0];
          } else if (data && typeof data === 'object') {
            return data;
          }
        }
      } catch (_) {
        // ignore and fall back to live aggregation
      }
    }

    // Fallback/live aggregation from products and categories
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${MOCKAPI_BASE_URL}/products`),
      fetch(`${MOCKAPI_BASE_URL}/categories`),
    ]);

    let products = [];
    let categories = [];
    if (productsRes.status === 404) {
      products = [];
    } else if (!productsRes.ok) {
      throw new Error('Failed to fetch products');
    } else {
      products = await productsRes.json();
    }

    if (categoriesRes.status === 404) {
      categories = [];
    } else if (!categoriesRes.ok) {
      throw new Error('Failed to fetch categories');
    } else {
      categories = await categoriesRes.json();
    }

    return this._aggregateProductStats(Array.isArray(products) ? products : [], Array.isArray(categories) ? categories : []);
  }

  _aggregateProductStats(products, categories) {
    var totalProducts = Array.isArray(products) ? products.length : 0;
    var categoriesCount = Array.isArray(categories) ? categories.length : 0;

    // Normalize price to number (ES5 style)
    var prices = [];
    for (var i = 0; i < totalProducts; i++) {
      var pr = Number(products[i] && products[i].price);
      if (!isNaN(pr)) prices.push(pr || 0);
    }
    var sumPrice = 0;
    for (var j = 0; j < prices.length; j++) sumPrice += prices[j];
    var avgPrice = totalProducts > 0 ? Math.round(sumPrice / totalProducts) : 0;
    var minPrice = prices.length ? Math.min.apply(Math, prices) : 0;
    var maxPrice = prices.length ? Math.max.apply(Math, prices) : 0;

    // Flags
    var hitsCount = 0, newCount = 0, saleCount = 0;
    var productsWithTypes = 0;
    var totalTypes = 0;
    for (var k = 0; k < totalProducts; k++) {
      var p = products[k] || {};
      if (p.hit || p.isHit) hitsCount++;
      if (p.new || p.isNew) newCount++;
      if (p.sale || p.isSale) saleCount++;
      if (p.types && Array.isArray(p.types) && p.types.length > 0) {
        productsWithTypes++;
        totalTypes += p.types.length;
      }
    }
    var avgTypesPerProduct = totalProducts > 0 ? Number(((productsWithTypes > 0 ? (totalTypes / totalProducts) : 0)).toFixed(2)) : 0;

    // Category mapping
    var productsPerCategoryMap = {};
    for (var m = 0; m < totalProducts; m++) {
      var cp = products[m] || {};
      var cat = cp.category || cp.categoryName || 'Без категории';
      productsPerCategoryMap[cat] = (productsPerCategoryMap[cat] || 0) + 1;
    }
    var productsPerCategory = [];
    for (var catKey in productsPerCategoryMap) {
      if (Object.prototype.hasOwnProperty.call(productsPerCategoryMap, catKey)) {
        productsPerCategory.push({ category: catKey, count: productsPerCategoryMap[catKey] });
      }
    }
    productsPerCategory.sort(function(a, b) { return b.count - a.count; });

    // Price buckets (simple distribution)
    var buckets = [
      { label: '0-999', from: 0, to: 999 },
      { label: '1000-1999', from: 1000, to: 1999 },
      { label: '2000-2999', from: 2000, to: 2999 },
      { label: '3000-4999', from: 3000, to: 4999 },
      { label: '5000+', from: 5000, to: 9007199254740991 },
    ];
    var priceDistribution = [];
    for (var b = 0; b < buckets.length; b++) {
      var bucket = buckets[b];
      var cnt = 0;
      for (var n = 0; n < totalProducts; n++) {
        var val = Number(products[n] && products[n].price) || 0;
        if (val >= bucket.from && val <= bucket.to) cnt++;
      }
      priceDistribution.push({ label: bucket.label, count: cnt });
    }

    return {
      totalProducts: totalProducts,
      categoriesCount: categoriesCount,
      avgPrice: avgPrice,
      minPrice: minPrice,
      maxPrice: maxPrice,
      hitsCount: hitsCount,
      newCount: newCount,
      saleCount: saleCount,
      productsWithTypes: productsWithTypes,
      avgTypesPerProduct: avgTypesPerProduct,
      productsPerCategory: productsPerCategory,
      priceDistribution: priceDistribution,
    };
  }
}

export default new ApiService();
