import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo biến toàn cục để lưu trữ dữ liệu
let globalUser = null;
let globalIsAuthenticated = false;

// Khởi tạo từ localStorage nếu có
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('userData');
  const token = localStorage.getItem('token');
  if (storedUser && token) {
    globalUser = JSON.parse(storedUser);
    globalIsAuthenticated = true;
  }
}

// Create the context with a default value
const AuthContext = createContext({
  user: globalUser,
  isAuthenticated: globalIsAuthenticated,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(globalUser);
  const [isAuthenticated, setIsAuthenticated] = useState(globalIsAuthenticated);

  // Cập nhật biến toàn cục khi state thay đổi
  useEffect(() => {
    globalUser = user;
    globalIsAuthenticated = isAuthenticated;
  }, [user, isAuthenticated]);

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      globalUser = parsedUser;
      globalIsAuthenticated = true;
    }
  }, []);

  const login = (userData) => {
    console.log('Login called with:', userData); // Debug log
    setUser(userData);
    setIsAuthenticated(true);
    globalUser = userData;
    globalIsAuthenticated = true;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('Logout called'); // Debug log
    setUser(null);
    setIsAuthenticated(false);
    globalUser = null;
    globalIsAuthenticated = false;
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 