import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import myImage from '../../assets/images/image 42.png';
import chuong from '../../assets/images/chuong.png';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import github from '../../assets/images/github.png';
    
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  
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
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store token or user data in localStorage if needed
        localStorage.setItem('token', data.token);
        // Redirect to home page or dashboard
        window.location.href = '/';
      } else {
        setError('Đăng nhập thất bại: ' + (data.message || 'Vui lòng kiểm tra lại thông tin'));
      }
    } catch (error) {
      setError('Có lỗi xảy ra: ' + error);
    }
  };
  
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      {/* Header */}
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
                <ul className="list-unstyled d-flex mb-0">
                  <li className="mx-3"><Link to="/" className="text-decoration-none fw-bold text-dark">Trang chủ</Link></li>
                  <li className="mx-3"><Link to="/about" className="text-decoration-none fw-bold text-dark">Về UNISHARE</Link></li>
                  <li className="mx-3"><Link to="/group" className="text-decoration-none fw-bold text-dark">Group</Link></li>
                  <li className="mx-3"><Link to="/teachers" className="text-decoration-none fw-bold text-dark">Giảng viên</Link></li>
                  <li className="mx-3"><Link to="/blog" className="text-decoration-none fw-bold text-dark">Blog</Link></li>
                  <li className="mx-3"><Link to="/contact" className="text-decoration-none fw-bold text-dark">Liên hệ</Link></li>
                  <li className="mx-3">
                    <img src={chuong} alt="Thông báo" width="30" height="30" />

                    
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Breadcrumb & Back Button */}
      <Container className="mt-5 pt-5">
        <Row className="bg-white shadow-sm p-3 rounded align-items-center">
          <Col>
            <h2 className="fs-6 mb-0">Trang chủ &gt; Đăng nhập</h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={goBack}>Quay lại</Button>
          </Col>
        </Row>
      </Container>

      {/* Login Section */}
      <section className="login-section py-5">
        <Container>
          <Row className="justify-content-center align-items-center g-4">
            <Col md={6}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <h2 className="text-center mb-2">Học Tập Cùng <span className="text-primary fw-bold">UNISHARE</span> Ngay Thôi Nào!</h2>
                  <p className="text-center text-primary fw-bold mb-4">ĐĂNG NHẬP</p>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Mật Khẩu" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <div className="text-end mb-3">
                      <Link to="/forgot-password" className="text-primary text-decoration-none">Quên Mật Khẩu?</Link>
                    </div>
                    
                    <div className="d-grid">
                      <Button variant="primary" type="submit" className="py-2">
                        ĐĂNG NHẬP
                      </Button>
                    </div>
                  </Form>
                  
                  <p className="text-center mt-4 mb-3">Đăng Nhập Với</p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <img src={facebook} alt="Facebook" className="social-icon" />
                    <img src={google} alt="Google" className="social-icon" />
                    <img src={github} alt="Apple" className="social-icon" />
                  </div>
                  
                  <p className="text-center">
                    Không có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} className="d-none d-md-block">
              <div className="text-end">
                <img src={myImage} alt="UNISHARE" className="img-fluid" width="600" height="600" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      {/*<footer className="bg-white py-4 mt-5">
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
                <img src={google} alt="Google" className="me-2" width="30" height="30" />
                <img src={apple} alt="Apple" width="30" height="30" />
              </div>
              <Link to="/privacy" className="d-block text-decoration-none text-primary mb-2">Chính sách bảo mật</Link>
              <Link to="/terms" className="d-block text-decoration-none text-primary mb-2">Điều khoản dịch vụ</Link>
            </Col>
          </Row>
        </Container>
      </footer>*/}
    </>
  );
};

export default Login;