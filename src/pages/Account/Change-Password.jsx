import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, NavDropdown, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Change-Password.css';
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
  // State for dropdown menu
  const [showSubmenu, setShowSubmenu] = useState(true);
  
  // State for form fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for error messages
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);

  // Toggle submenu visibility
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // Clear error when user types
    if (passwordError) {
      setPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }
    
    // Here you would typically send data to your backend
    console.log('Password change submitted:', passwordData);
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      {/* Header */}
      <Navbar expand="lg" className="bg-white shadow-sm py-2 fixed-top">
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
            <Link to="/login" className="btn btn-primary ms-lg-3">Đăng nhập →</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="main-container">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="sidebar">
            {/* Profile */}
            <div className="profile d-flex align-items-center">
              <img src={change1} alt="Nguyễn Văn A"  className="profile-img rounded-circle" 
              />
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
              {passwordError && (
                <Alert variant="danger" className="mb-4">{passwordError}</Alert>
              )}
              
              {success && (
                <Alert variant="success" className="mb-4">Mật khẩu đã được thay đổi thành công!</Alert>
              )}
              
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Mật khẩu hiện tại:</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  required
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
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold">Xác nhận mật khẩu:</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="change-password-btn">
                  Đổi mật khẩu
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