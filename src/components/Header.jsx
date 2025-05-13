import React from 'react';
import { Container, Row, Col, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import chuong from '../assets/images/chuong.png';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed-top bg-white shadow-sm py-2">
      <Container>
        <Row className="align-items-center">
          <Col xs="auto">
            <div className="logo">
              <img src={logo} alt="UNISHARE Logo" height="70" />
            </div>
          </Col>
          <Col>
            <nav className="d-flex justify-content-center">
              <ul className="list-unstyled d-flex mb-0 align-items-center">
                <li className="mx-3"><Link to="/" className="text-decoration-none fw-bold text-dark">Trang chủ</Link></li>
                <li className="mx-3"><Link to="/about" className="text-decoration-none fw-bold text-dark">Về UNISHARE</Link></li>
                <li className="mx-3"><Link to="/group" className="text-decoration-none fw-bold text-dark">Group</Link></li>
                <li className="mx-3"><Link to="/teachers" className="text-decoration-none fw-bold text-dark">Giảng viên</Link></li>
                <li className="mx-3"><Link to="/blog" className="text-decoration-none fw-bold text-dark">Blog</Link></li>
                <li className="mx-3"><Link to="/contact" className="text-decoration-none fw-bold text-dark">Liên hệ</Link></li>
                <li className="mx-3">
                  <img src={chuong} alt="Thông báo" width="30" height="30" />
                </li>
                {isAuthenticated ? (
                  <li className="mx-3">
                    <NavDropdown 
                      title={
                        <span className="text-dark">
                          <i className="fas fa-user-circle me-1"></i>
                          {user.name}
                        </span>
                      } 
                      id="user-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="/profile">Tài khoản của tôi</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/settings">Cài đặt</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                    </NavDropdown>
                  </li>
                ) : (
                  <li className="mx-3">
                    <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
                  </li>
                )}
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header; 