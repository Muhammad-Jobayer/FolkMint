export const API_BASE_URL = 'http://localhost:8000/api';

const apiCache = new Map<string, { data: any; timestamp: number }>();

export interface ApiRequestOptions extends RequestInit {
    cacheTimeMs?: number;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  try {
    const isGetReq = !options.method || options.method.toUpperCase() === 'GET';
    if (isGetReq && options.cacheTimeMs) {
        const cached = apiCache.get(endpoint);
        if (cached && Date.now() - cached.timestamp < options.cacheTimeMs) {
            return cached.data;
        }
    }

    const isFormData = options.body instanceof FormData;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include', // Important for HttpOnly cookies
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Unauthorized - session might have expired
      return { success: false, error: 'Session expired. Please login again.' };
    }

    const result = await response.json();
    
    if (!response.ok || result.success === false) {
      return { 
        success: false, 
        message: result.message || 'An unexpected error occurred',
        error: result.message || `Error: ${response.statusText}` 
      };
    }

    const payload = { 
      success: true, 
      data: result.data as T, 
      message: result.message 
    };

    if (isGetReq && options.cacheTimeMs) {
        apiCache.set(endpoint, { data: payload, timestamp: Date.now() });
    }

    return payload;
  } catch (err) {
    return { success: false, error: 'Network error. Please check your connection.' };
  }
}

export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads')) return `http://localhost:8000${url}`;
  if (url.startsWith('/images/catagorized img/')) return `http://localhost:8000${url}`;
  return url;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
