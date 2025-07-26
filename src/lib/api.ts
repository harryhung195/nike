// Frontend API utility functions
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:3000';

// Token management
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Product API functions
export const productAPI = {
  getAll: async (filters?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (filters?.category) searchParams.append('category', filters.category);
    if (filters?.search) searchParams.append('search', filters.search);
    
    const queryString = searchParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  getById: async (id: string) => {
    return apiRequest(`/api/products/${id}`);
  },

  create: async (productData: Record<string, unknown>) => {
    return apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id: string, productData: Record<string, unknown>) => {
    return apiRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: () => {
    removeAuthToken();
  },
};

// Cart API functions
export const cartAPI = {
  get: async () => {
    return apiRequest('/api/cart');
  },

  add: async (productId: string, size: string, color: string, quantity: number) => {
    return apiRequest('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, size, color, quantity }),
    });
  },

  update: async (productId: string, size: string, color: string, quantity: number) => {
    return apiRequest('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId, size, color, quantity }),
    });
  },

  clear: async () => {
    return apiRequest('/api/cart', {
      method: 'DELETE',
    });
  },
};

// Order API functions
export const orderAPI = {
  getAll: async () => {
    return apiRequest('/api/orders');
  },

  getById: async (id: string) => {
    return apiRequest(`/api/orders/${id}`);
  },

  create: async (orderData: { items: unknown[]; shippingAddress: Record<string, unknown>; total: number }) => {
    return apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Review API functions
export const reviewAPI = {
  getByProduct: async (productId: string) => {
    return apiRequest(`/api/reviews?productId=${productId}`);
  },

  create: async (reviewData: { productId: string; rating: number; comment: string }) => {
    return apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

// User API functions
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/api/user/profile');
  },

  updateProfile: async (userData: Record<string, unknown>) => {
    return apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};
