import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [key, setKey] = useState(0); // Thêm state để force re-render

  // Effect để reload component khi auth state thay đổi
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const cookies = document.cookie.split(';');
      const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      const csrfToken = xsrfCookie ? decodeURIComponent(xsrfCookie.split('=')[1]) : '';

      const response = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Xóa tất cả cookies liên quan đến session
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        // Xóa token và dữ liệu user khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // Gọi hàm logout từ AuthContext
        logout();
        
        // Force re-render component
        setKey(prevKey => prevKey + 1);
        
        // Hiển thị thông báo thành công
        setAlertMessage('Đăng xuất thành công!');
        setAlertVariant('success');
        setShowAlert(true);
        
        // Ẩn thông báo sau 2 giây và chuyển hướng
        setTimeout(() => {
          setShowAlert(false);
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setAlertMessage(data.message || 'Đăng xuất thất bại. Vui lòng thử lại!');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại!');
      setAlertVariant('danger');
      setShowAlert(true);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div key={key}>
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          className="position-fixed top-0 start-50 translate-middle-x mt-5" 
          style={{ zIndex: 9999 }}
          onClose={() => setShowAlert(false)} 
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Navbar expand="lg" className="fixed-top bg-white shadow-sm py-2">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="UNISHARE Logo" height="70" className="logo-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-center">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="fw-bold mx-3">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-bold mx-3">Về UNISHARE</Nav.Link>
              <Nav.Link as={Link} to="/group" className="fw-bold mx-3">Group</Nav.Link>
              <Nav.Link as={Link} to="/teachers" className="fw-bold mx-3">Giảng viên</Nav.Link>
              <Nav.Link as={Link} to="/blog" className="fw-bold mx-3">Blog</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="fw-bold mx-3">Liên hệ</Nav.Link>
              <Nav.Link as={Link} to="/notifications" className="mx-3">
                <img src={chuong} alt="Thông báo" width="30" height="30" />
              </Nav.Link>
            </Nav>
            {isAuthenticated && user ? (
              <div className="d-flex align-items-center">
                <Link to="/account" className="me-3 text-primary fw-bold text-decoration-none" style={{ cursor: 'pointer' }}>
                   {user.name}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-primary"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary login-btn">
                Đăng nhập →
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
