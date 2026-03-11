const BASE_URL = import.meta.env.VITE_API_URL || '';

export const http = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config = {
        ...options,
        credentials: options.credentials || 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // Convert to JSON (if possible)
        let data = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Nếu HTTP lỗi hoặc data trả về báo false success
        if (!response.ok || (data && typeof data === 'object' && data.success === false)) {
            if (response.status === 401) {
                // Clear token when unauthorized
                localStorage.removeItem('token');
                // Optional: redirect to login
                // window.location.href = '/login';
            }
            const errorMsg = data?.message || 'Đã có lỗi xảy ra từ máy chủ (Network Error)';
            throw new Error(errorMsg);
        }

        return data; // Return always resolved data context
    } catch (error) {
        throw error;
    }
};

export default http;
