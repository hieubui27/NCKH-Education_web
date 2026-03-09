import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchCurrentUser = async () => {
            try {
                // Gọi API backend (Đổi endpoint '/api/auth/me' đúng với BE của bạn)
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // Quan trọng: Yêu cầu trình duyệt đính kèm Cookie 🍪
                });

                if (response.ok) {
                    const data = await response.json();
                    // Cập nhật tùy cấu trúc BE trả về (ví dụ data.data, data.user hoặc thẳng data)
                    if (mounted) setUser(data?.data || data?.user || data);
                } else {
                    // Token/Cookie không hợp lệ hoặc đã hết hạn
                    if (mounted) setUser(null);
                }
            } catch (error) {
                console.error('Lấy thông tin người dùng thất bại:', error);
                if (mounted) setUser(null);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchCurrentUser();

        return () => {
            mounted = false;
        };
    }, []);

    const login = (userData) => {
        // Được gọi sau khi Component Login/Register gọi API đăng nhập thành công
        setUser(userData);
    };

    const logout = async () => {
        try {
            // Báo BE hủy cookie session. (Thay đổi endpoint tùy BE thiết kế)
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Lỗi khi gọi API đăng xuất:', error);
        } finally {
            // Clear state người dùng ở FE
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        logout,
        isLoading,
        isLoggedIn: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}