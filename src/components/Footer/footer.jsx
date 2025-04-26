// src/components/Footer/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Đổi đường dẫn nếu cần
import facebook from "../../assets/facebook.png";
import youtube from "../../assets/youtube.png";
import instagram from "../../assets/instagram.png";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <Container>
      <div className="footer-logo mb-4">
        <img src={logo} alt="UNISHARE Logo" height="80" />
      </div>
      <Row>
        <Col md={4} className="mb-4 mb-md-0">
          <h3 className="footer-title">Thông Tin Liên Hệ</h3>
          <p>📞 0917639460 | 0905817290</p>
          <p>📧 nnnlt223344@gmail.com</p>
          <p>📍 254 Nguyễn Lương Bằng, Đà Nẵng</p>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <h3 className="footer-title">Các Danh Mục</h3>
          <Row>
            <Col xs={6}>
              <Link to="/about" className="footer-link">Về UNISHARE</Link>
              <Link to="/teachers" className="footer-link">Giảng Viên</Link>
              <Link to="/group" className="footer-link">Group</Link>
            </Col>
            <Col xs={6}>
              <Link to="/news" className="footer-link">Tin Tức</Link>
              <Link to="/support" className="footer-link">Hỗ Trợ</Link>
              <Link to="/documents" className="footer-link">Tài Liệu</Link>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <h3 className="footer-title">Theo Dõi Chúng Tôi</h3>
          <div className="footer-social mb-3">
            <img src={facebook} alt="Facebook" className="me-2" width="30" height="30" />
            <img src={youtube} alt="YouTube" className="me-2" width="30" height="30" />
            <img src={instagram} alt="Instagram" width="30" height="30" />
          </div>
          <Link to="/privacy" className="footer-link">Chính sách bảo mật</Link>
          <Link to="/terms" className="footer-link">Điều khoản dịch vụ</Link>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;