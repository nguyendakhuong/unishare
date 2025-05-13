import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Nav, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Change-Password.css';
import Header from '../Header/Header';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
import facebook  from '../../assets/images/facebook.png';
import youtube  from '../../assets/images/youtube.png';
import instagram  from '../../assets/images/Instagram.png';
import change1 from '../../assets/images/image 5.png';
import change2 from '../../assets/images/image 56.png';
import change3 from '../../assets/images/image 6.png';
import change4 from '../../assets/images/image 7.png';
import change5 from '../../assets/images/image 8.png';
import change6 from '../../assets/images/image 9.png';
import change7 from '../../assets/images/image 10.png';
// Import images (update paths as needed for your project structure)


const ChangePassword = () => {
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Kiểm tra xem user đã đăng nhập chưa
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlertMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      setAlertVariant('danger');
      setShowAlert(true);
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra độ dài mật khẩu mới
    if (passwordData.newPassword.length < 8) {
      setAlertMessage('Mật khẩu mới phải có ít nhất 8 ký tự');
      setAlertVariant('danger');
      setShowAlert(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const cookies = document.cookie.split(';');
      const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      const csrfToken = xsrfCookie ? decodeURIComponent(xsrfCookie.split('=')[1]) : '';
      const userData = JSON.parse(localStorage.getItem('userData'));

      const response = await fetch('http://localhost:8000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          email: userData?.email,
          password: passwordData.newPassword,
          password_confirmation: passwordData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('Đổi mật khẩu thành công!');
        setAlertVariant('success');
        setShowAlert(true);
        
        // Reset form
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        // Chuyển về trang Account sau 2 giây
        setTimeout(() => {
          navigate('/account');
        }, 2000);
      } else {
        // Xử lý lỗi validation từ server
        if (response.status === 422) {
          const errors = data.errors || {};
          const errorMessage = Object.values(errors).flat().join('\n');
          setAlertMessage(errorMessage || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!');
        } else {
          setAlertMessage(data.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại!');
        }
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Change password error:', error);
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại!');
      setAlertVariant('danger');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
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

      {/* Main Content */}
      <Container fluid className="main-container">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="sidebar">
            {/* Profile */}
            <div className="profile d-flex align-items-center">
              <img src={change1} alt="Profile Picture" className="profile-img rounded-circle" />
              <div className="profile-info">
                <p className="profile-name mb-1">Nguyễn Văn A</p>
                <Link to="/edit-profile" className="edit-profile-link d-flex align-items-center">
                  <img src={change2} alt="Edit" width="20" height="20" className="me-1" /> Sửa hồ sơ
                </Link>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="sidebar-dropdown" onClick={toggleSubmenu}>
              <div className="d-flex align-items-center cursor-pointer p-2">
                <span><Link to="/account" className="text-decoration-none text-dark">Hồ sơ cá nhân</Link></span>
                <span className="ms-auto">{showSubmenu ? '▲' : '▼'}</span>
              </div>
              {showSubmenu && (
                <Nav className="flex-column submenu">
                  <Nav.Link as={Link} to="/edit-profile" className="submenu-item">Chỉnh sửa</Nav.Link>
                  <Nav.Link as={Link} to="/change-password" className="submenu-item active">Đổi mật khẩu</Nav.Link>
                </Nav>
              )}
            </div>

            {/* Regular Menu Items */}
            <Nav className="flex-column sidebar-menu">
              <Nav.Link as={Link} to="/documents" className="sidebar-menu-item">
                <img src={change3} alt="Documents" width="20" height="20" className="me-3" />
                <span>Tài liệu</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="sidebar-menu-item">
                <img src={change3} alt="History" width="20" height="20" className="me-3" />
                <span>Lịch sử tham gia</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/groups" className="sidebar-menu-item">
                <img src={change4} alt="Groups" width="20" height="20" className="me-3" />
                <span>Nhóm học tham gia</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/guide" className="sidebar-menu-item">
                <img src={change5} alt="Guide" width="20" height="20" className="me-3" />
                <span>Hướng dẫn sử dụng</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/settings" className="sidebar-menu-item">
                <img src={change6} alt="Settings" width="20" height="20" className="me-3" />
                <span>Cài đặt</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/terms" className="sidebar-menu-item">
                <img src={change7} alt="Terms" width="20" height="20" className="me-3" />
                <span>Điều khoản người dùng</span>
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Form Content */}
          <Col md={9} className="password-form-container">
            <div className="password-form-header mb-5">
              <h2 className="text-primary">Đổi mật khẩu</h2>
            </div>

            <Form onSubmit={handleSubmit} className="password-form">
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Mật khẩu hiện tại:</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Mật khẩu mới:</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <Form.Text className="text-muted">
                  Mật khẩu phải có ít nhất 8 ký tự
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold">Xác nhận mật khẩu:</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </Form.Group>

              <div className="text-center">
                <Button 
                  type="submit" 
                  className="change-password-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-white py-4 mt-5">
        <Container>
          <div className="mb-4">
            <img src={logo} alt="UNISHARE Logo" height="80" />
          </div>
          
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h3 className="fs-5 mb-3">Thông Tin Liên Hệ</h3>
              <p>📞 0917639460 | 0905817290</p>
              <p>📧 nnnlt223344@gmail.com</p>
              <p>📍 254 Nguyễn Lương Bằng, Đà Nẵng</p>
            </Col>
            
            <Col md={4} className="mb-4 mb-md-0">
              <h3 className="fs-5 mb-3">Các Danh Mục</h3>
              <Row>
                <Col xs={6}>
                  <Link to="/about" className="d-block text-decoration-none text-primary mb-2">Về UNISHARE</Link>
                  <Link to="/teachers" className="d-block text-decoration-none text-primary mb-2">Giảng Viên</Link>
                  <Link to="/group" className="d-block text-decoration-none text-primary mb-2">Group</Link>
                </Col>
                <Col xs={6}>
                  <Link to="/news" className="d-block text-decoration-none text-primary mb-2">Tin Tức</Link>
                  <Link to="/support" className="d-block text-decoration-none text-primary mb-2">Hỗ Trợ</Link>
                  <Link to="/documents" className="d-block text-decoration-none text-primary mb-2">Tài Liệu</Link>
                </Col>
              </Row>
            </Col>
            
            <Col md={4}>
              <h3 className="fs-5 mb-3">Theo Dõi Chúng Tôi</h3>
              <div className="mb-3">
                <img src={facebook} alt="Facebook" className="me-2" width="30" height="30" />
                <img src={youtube} alt="YouTube" className="me-2" width="30" height="30" />
                <img src={instagram} alt="Instagram" width="30" height="30" />
              </div>
              <Link to="/privacy" className="d-block text-decoration-none text-primary mb-2">Chính sách bảo mật</Link>
              <Link to="/terms" className="d-block text-decoration-none text-primary mb-2">Điều khoản dịch vụ</Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default ChangePassword;