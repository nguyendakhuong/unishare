import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import logo from '../../assets/images/logo.png';
import chuong from '../../assets/images/chuong.png';
import facebook from '../../assets/images/facebook.png';
import youtube from '../../assets/images/youtube.png';
import instagram from '../../assets/images/Instagram.png';
import myImage from '../../assets/images/image 46.png';


const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
    c_password: '',
    role: '',
    agree: false
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.c_password) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    if (!formData.agree) {
      setError('Vui lòng chấp nhận điều khoản người dùng!');
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          c_password: formData.c_password,
          role: formData.role,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Đăng ký thành công!');
        setError('');
        console.log(data.data);
      } else {
        setError('Lỗi: ' + JSON.stringify(data.message));
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
            <h2 className="fs-6 mb-0">Trang chủ &gt; Đăng kí</h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={goBack}>Quay lại</Button>
          </Col>
        </Row>
      </Container>

      {/* Registration Section */}
      <section className="register-section py-5">
        <Container>
          <Row className="justify-content-center align-items-center g-4">
            <Col md={6} className="d-none d-md-block">
              <img src={myImage} alt="UNISHARE" className="img-fluid" />
            </Col>
            <Col md={6}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <h2 className="text-center mb-2">Học Tập Cùng <span className="text-primary fw-bold">UNISHARE</span> Ngay Thôi Nào!</h2>
                  <p className="text-center text-primary fw-bold mb-4">ĐĂNG KÍ</p>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="full_name"
                        placeholder="Họ và tên" 
                        value={formData.full_name}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="phone"
                        placeholder="Số điện thoại" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
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
                        placeholder="Mật khẩu" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="password" 
                        name="c_password"
                        placeholder="Xác nhận mật khẩu" 
                        value={formData.c_password}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="1">Học viên</option>
                        <option value="2">Giảng viên</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="checkbox" 
                        name="agree"
                        id="agree" 
                        label="Tôi chấp nhận điều khoản người dùng" 
                        checked={formData.agree}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button variant="primary" type="submit" className="py-2">
                        ĐĂNG KÝ
                      </Button>
                    </div>
                  </Form>
                  
                  <p className="text-center mt-3">
                    Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                  </p>
                </Card.Body>
              </Card>
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

export default Register;