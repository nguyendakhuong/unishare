import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Account.css';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
import AccountImage1 from  '../../assets/images/image 5.png';
import AccountImage2 from  '../../assets/images/image 6.png';
import AccountImage3 from  '../../assets/images/image 7.png';
import AccountImage4 from  '../../assets/images/image 8.png';
import AccountImage5 from  '../../assets/images/image 9.png';
import AccountImage6 from  '../../assets/images/image 10.png';
import AccountImage7 from  '../../assets/images/image 11.png';
import AccountImage8 from  '../../assets/images/image 12.png';
import facebook  from '../../assets/images/facebook.png';
import youtube  from '../../assets/images/youtube.png';
import instagram  from '../../assets/images/Instagram.png';

const Account = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nnnttt223344@gmail.com',
    phone: '',
    address: '',
    school: '',
    major: ''
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data updated:', profileData);
    // Here you would typically send the data to your backend
    alert('Thông tin đã được cập nhật!');
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    console.log('Image uploaded:', e.target.files[0]);
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

      Main Content
      <Container fluid className="pt-5 mt-5">
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-primary text-white sidebar">
            <div className="user-profile text-center py-4">
              <Image src={AccountImage1} alt="Profile Picture" roundedCircle className="avatar mb-3" width={80} height={80} />
              <h5>{profileData.fullName}</h5>
              <p className="mb-0 small">{profileData.email}</p>
            </div>
            
            <Nav className="flex-column">
              <Nav.Link className="text-white d-flex align-items-center py-2">
                <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', width: '100%' }}>
                  <img src={AccountImage2} alt="Hồ sơ cá nhân" width="20" height="20" className="me-2" />
                  <span>Hồ sơ cá nhân</span>
                  <span style={{ float: 'right' }}>{menuOpen ? '▲' : '▼'}</span>
                </div>
              </Nav.Link>
              {menuOpen && (
                <ul className="submenu-items ps-4">
                  <li className="py-1"><Link to="/edit-profile" className="text-white text-decoration-none">Chỉnh sửa</Link></li>
                  <li className="py-1"><Link to="/change-password" className="text-white text-decoration-none">Đổi mật khẩu</Link></li>
                </ul>
              )}
              
              <Nav.Link as={Link} to="/documents" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage3} alt="" width="20" height="20" className="me-2" />
                Tài liệu
              </Nav.Link>
              <Nav.Link as={Link} to="/history" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage4} alt="" width="20" height="20" className="me-2" />
                Lịch sử tham gia
              </Nav.Link>
              <Nav.Link as={Link} to="/groups" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage5} alt="" width="20" height="20" className="me-2" />
                Nhóm học tham gia
              </Nav.Link>
              <Nav.Link as={Link} to="/guide" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage6} alt="" width="20" height="20" className="me-2" />
                Hướng dẫn sử dụng
              </Nav.Link>
              <Nav.Link as={Link} to="/settings" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage7} alt="" width="20" height="20" className="me-2" />
                Cài đặt
              </Nav.Link>
              <Nav.Link as={Link} to="/terms" className="text-white d-flex align-items-center py-2">
                <img src={AccountImage8} alt="" width="20" height="20" className="me-2" />
                Điều khoản người dùng
              </Nav.Link>
            </Nav>
            
            <div className="text-center mt-4 mb-3">
              <Button variant="light" className="logout-btn">Đăng Xuất</Button>
            </div>
          </Col>
          
          {/* Main Profile Content */}
          <Col md={9} lg={10}>
            <Row className="h-100">
              {/* Profile Details */}
              <Col md={8} className="profile-details p-4;">
                <div className="profile-header">
                  <h2 className="text-primary">Thông tin cá nhân</h2>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="fullName" 
                          value={profileData.fullName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="phone" 
                          value={profileData.phone}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="address" 
                          value={profileData.address}
                          onChange={handleInputChange}
                          placeholder="Nhập địa chỉ"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Trường</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="school" 
                          value={profileData.school}
                          onChange={handleInputChange}
                          placeholder="Nhập tên trường"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngành học</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="major" 
                          value={profileData.major}
                          onChange={handleInputChange}
                          placeholder="Nhập ngành học"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="text-center mt-4 mb-4">
                    <Button type="submit" variant="primary" className="px-4">
                      Cập nhật
                    </Button>
                  </div>
                </Form>
              </Col>
              
              {/* Profile Image */}
              
            </Row>
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

export default Account; 