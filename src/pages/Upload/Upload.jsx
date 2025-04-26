import React from 'react';
import { Container, Row, Col, Navbar, Nav, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Upload.css';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
// Import the Sidebar component
import Sidebar from '../SideBar/SideBar';
// Import other images as needed for file previews, etc.
import filePreviewImage from '../../assets/images/image53.png'; // Adjust path as needed
import facebookIcon from '../../assets/images/facebook.png';
import youtubeIcon from '../../assets/images/youtube.png';
import instagramIcon from '../../assets/images/Instagram.png';

const Upload = () => {
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
      <Container fluid className="main-container d-flex p-0">
        {/* Use the Sidebar component here */}
        <Sidebar />

        {/* Main Content */}
        <div className="content-area">
          <div className="content-header">
            <h1>Chào mừng bạn đến với <span className="highlight">UNISHARE!</span> 🎉</h1>
            <Form.Control 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="search-bar"
            />
          </div>

          {/* Recommended Folders Section */}
          <section className="content-section">
            <h2>Thư mục đề xuất</h2>
            <Row className="file-container">
              {[...Array(6)].map((_, index) => (
                <Col md={4} key={`folder-${index}`}>
                  <Card className="file-card mb-3">
                    <Card.Body>
                      <Card.Title>
                        {index < 4 ? "Tài liệu Toán cao cấp" : 
                         index === 4 ? "Tài liệu Vật lý" : "Tài liệu Hóa học"}
                      </Card.Title>
                      <Card.Text>
                        {index < 4 ? "File chứa lý thuyết và bài tập." : 
                         index === 4 ? "File ôn tập cho kỳ thi." : "File hướng dẫn thực hành."}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* Recommended Files Section */}
          <section className="content-section">
            <h2>Tệp đề xuất</h2>
            <Row className="file-container">
              {[...Array(6)].map((_, index) => (
                <Col md={4} key={`file-${index}`}>
                  <Card className="file-card mb-3">
                    <Card.Body className="text-center">
                      <Card.Title>
                        {`Ôn tập thi trắc nghiệm ${(index % 3) + 1}`}
                      </Card.Title>
                      <img 
                        src={filePreviewImage} 
                        alt={`Ôn tập thi trắc nghiệm ${(index % 3) + 1}`} 
                        className="file-preview-img"
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </div>
      </Container>

      {/* Footer */}
      <footer>
        <Container>
          <Row className="gy-4">
            <Col lg={4}>
              <div className="footer-logo">
                <img src={logo} alt="UNISHARE Logo" />
              </div>
              <div className="footer-contact">
                <p><i className="fas fa-phone"></i> 0917639460 | 0905817290</p>
                <p><i className="fas fa-envelope"></i> nnnlt223344@gmail.com</p>
                <p><i className="fas fa-map-marker-alt"></i> 254 Nguyễn Lương Bằng, Đà Nẵng</p>
              </div>
            </Col>
            
            <Col lg={4}>
              <h3 className="h5 mb-3">Các Danh Mục</h3>
              <div className="footer-links">
                <Link to="/about">Về UNISHARE</Link>
                <Link to="/teachers">Giảng Viên</Link>
                <Link to="/group">Group</Link>
                <Link to="/news">Tin Tức</Link>
                <Link to="/support">Hỗ Trợ</Link>
                <Link to="/documents">Tài Liệu</Link>
              </div>
            </Col>
            
            <Col lg={4}>
              <h3 className="h5 mb-3">Theo Dõi Chúng Tôi</h3>
              <div className="social-icons">
                <a href="#facebook"><img src={facebookIcon} alt="Facebook" /></a>
                <a href="#youtube"><img src={youtubeIcon} alt="YouTube" /></a>
                <a href="#instagram"><img src={instagramIcon} alt="Instagram" /></a>
              </div>
              <div className="footer-links">
                <Link to="/privacy">Chính sách bảo mật</Link>
                <Link to="/terms">Điều khoản dịch vụ</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Upload;