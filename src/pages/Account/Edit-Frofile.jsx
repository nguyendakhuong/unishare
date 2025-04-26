import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Edit-Profile.css';
import facebook  from '../../assets/images/facebook.png';
import youtube  from '../../assets/images/youtube.png';
import instagram  from '../../assets/images/Instagram.png';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
import edit1 from '../../assets/images/image 5.png';
import edit2 from '../../assets/images/image 56.png';
import edit3 from '../../assets/images/image 6.png';
import edit4 from '../../assets/images/image 7.png';
import edit5 from '../../assets/images/image 8.png';
import edit6 from '../../assets/images/image 9.png';
import edit7 from '../../assets/images/image 10.png';
import edit8 from '../../assets/images/image 11.png';
import edit9 from '../../assets/images/image 12.png';
const EditProfile = () => {
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [formData, setFormData] = useState({
    firstName: 'Nguyễn van a',
    birthDate: '2003-12-21',
    gender: 'Nam',
    phone: '0917639460',
    address: '216 Núi Thành, Phường Hòa Cường Bắc, Quận Hải Châu, Thành phố Đà Nẵng'
  });

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    alert('Thông tin đã được cập nhật thành công!');
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
              <img src={edit1} alt="Nguyễn Văn A" className="profile-img rounded-circle" />
              <div className="profile-info">
                <p className="profile-name mb-1">Nguyễn Văn A</p>
                <Link to="/edit-profile" className="edit-profile-link d-flex align-items-center">
                  <img src={edit2} alt="Edit" width="20" height="20" className="me-1" /> Sửa hồ sơ
                </Link>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="sidebar-dropdown" onClick={toggleSubmenu}>
              <div className="d-flex align-items-center cursor-pointer p-2">
                <img src={edit3} alt="" width="20" height="20" className="me-3" />
                <span>Hồ sơ cá nhân</span>
                <span className="ms-auto">{showSubmenu ? '▲' : '▼'}</span>
              </div>
              
              {showSubmenu && (
                <Nav className="flex-column submenu">
                  
                  <Nav.Link as={Link} to="/edit-profile" className="submenu-item active">Chỉnh sửa</Nav.Link>
                  <Nav.Link as={Link} to="/change-password" className="submenu-item">Đổi mật khẩu</Nav.Link>
                </Nav>
              )}
            </div>

            {/* Regular Menu Items */}
            <Nav className="flex-column sidebar-menu">
              <Nav.Link as={Link} to="/documents" className="sidebar-menu-item">
                <img src={edit4} alt="Documents" width="20" height="20" className="me-3" />
                <span>Tài liệu</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="sidebar-menu-item">
                <img src={edit5} alt="History" width="20" height="20" className="me-3" />
                <span>Lịch sử tham gia</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/groups" className="sidebar-menu-item">
                <img src={edit6} alt="Groups" width="20" height="20" className="me-3" />
                <span>Nhóm học tham gia</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/guide" className="sidebar-menu-item">
                <img src={edit7} alt="Guide" width="20" height="20" className="me-3" />
                <span>Hướng dẫn sử dụng</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/settings" className="sidebar-menu-item">
                <img src={edit8} alt="Settings" width="20" height="20" className="me-3" />
                <span>Cài đặt</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/terms" className="sidebar-menu-item">
                <img src={edit9} alt="Terms" width="20" height="20" className="me-3" />
                <span>Điều khoản người dùng</span>
              </Nav.Link>
            </Nav>
          </Col>
          
          {/* Main Form Content */}
          <Col md={9} className="edit-form-container">
            <div className="edit-form-header mb-4">
              <h2 className="text-primary">Chỉnh sửa thông tin</h2>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Họ</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Giới tính</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-end mt-4">
                <Button type="submit" className="submit-button">
                  Lưu lại thay đổi
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

export default EditProfile;