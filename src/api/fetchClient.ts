export interface FetchOptions extends RequestInit {
    // 自定義配置，例如需要額外的標頭
    headers?: Record<string, string>;
  }
  
  export async function fetchClient<T>(
    url: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
  
    // 獲取 Token（例如從 localStorage）
    const token = localStorage.getItem('token');
    const headers = {
      ...defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
  
    const config: RequestInit = {
      ...options,
      headers,
    };
  
    try {
      const response = await fetch(url, config);
  
      if (!response.ok) {
        // 處理 HTTP 錯誤
        const errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      // 返回解析後的數據，泛型確保返回類型的靈活性
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }