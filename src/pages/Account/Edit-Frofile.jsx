import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Form, Button, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Edit-Profile.css';
import Header from '../Header/Header';
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
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    birthDate: '',
    gender: '',
    phone: '',
    address: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setFormData({
        firstName: userData.name || '',
        birthDate: userData.birthDate || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        address: userData.address || ''
      });
    } else {
      // Nếu không có dữ liệu user, chuyển về trang login
      navigate('/login');
    }
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cookies = document.cookie.split(';');
      const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      const csrfToken = xsrfCookie ? decodeURIComponent(xsrfCookie.split('=')[1]) : '';

      const response = await fetch('http://localhost:8000/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Cập nhật dữ liệu trong localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        localStorage.setItem('userData', JSON.stringify({
          ...userData,
          ...formData
        }));

        setAlertMessage('Cập nhật thông tin thành công!');
        setAlertVariant('success');
        setShowAlert(true);

        // Ẩn thông báo sau 2 giây
        setTimeout(() => {
          setShowAlert(false);
          navigate('/account'); // Chuyển về trang Account sau khi cập nhật thành công
        }, 2000);
      } else {
        const data = await response.json();
        setAlertMessage(data.message || 'Cập nhật thất bại. Vui lòng thử lại!');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại!');
      setAlertVariant('danger');
      setShowAlert(true);
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
              <img src={edit1} alt="Profile Picture" className="profile-img rounded-circle" />
              <div className="profile-info">
                <p className="profile-name mb-1">{formData.firstName}</p>
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
                    <Form.Label className="fw-bold">Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
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
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Số điện thoại</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
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
                      placeholder="Nhập địa chỉ"
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