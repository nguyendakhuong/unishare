import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.png';
import youtube from '../../assets/images/youtube.png';
import instagram from '../../assets/images/Instagram.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-white py-4">
      <Container>
        <Row>
          <Col xs={12} className="mb-4">
            <img src={logo} alt="UNISHARE Logo" height="80" />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h3>Thông Tin Liên Hệ</h3>
            <p>📞 0917639460 | 0905817290</p>
            <p>📧 nnnlt223344@gmail.com</p>
            <p>📍 254 Nguyễn Lương Bằng, Đà Nẵng</p>
          </Col>
          <Col md={4}>
            <h3>Các Danh Mục</h3>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/about">Về UNISHARE</Nav.Link>
              <Nav.Link as={Link} to="/teachers">Giảng Viên</Nav.Link>
              <Nav.Link as={Link} to="/group">Group</Nav.Link>
              <Nav.Link as={Link} to="/news">Tin Tức</Nav.Link>
              <Nav.Link as={Link} to="/support">Hỗ Trợ</Nav.Link>
              <Nav.Link as={Link} to="/documents">Tài Liệu</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h3>Theo Dõi Chúng Tôi</h3>
            <div className="mb-3">
              <img src={facebook} alt="Facebook" className="me-2" width="30" height="30" />
              <img src={youtube} alt="YouTube" className="me-2" width="30" height="30" />
              <img src={instagram} alt="Instagram" width="30" height="30" />
            </div>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/privacy">Chính sách bảo mật</Nav.Link>
              <Nav.Link as={Link} to="/terms">Điều khoản dịch vụ</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 