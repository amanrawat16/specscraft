const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export class BaseService {
  static async apiCall<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Use relative URL - this works in both development and production
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    return response.json();
  }

  static async apiCallWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Use relative URL - this works in both development and production
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API call failed: ${response.status}`);
    }

    return response.json();
  }
} 