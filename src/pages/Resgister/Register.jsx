import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import Header from '../Header/Header';
import facebook from '../../assets/images/facebook.png';
import youtube from '../../assets/images/youtube.png';
import instagram from '../../assets/images/Instagram.png';
import myImage from '../../assets/images/image 46.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    university: '',
    department: '',
    student_id: '',
    bio: '',
    agree: false
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Update the CSRF token fetching
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          // Get the token from the cookie
          const cookies = document.cookie.split(';');
          const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
          if (xsrfCookie) {
            const token = decodeURIComponent(xsrfCookie.split('=')[1]);
            setCsrfToken(token);
          }
        } else {
          console.error('Failed to get CSRF token:', response.status);
          setError('Không thể kết nối đến server. Vui lòng đảm bảo server đang chạy.');
        }
      } catch (error) {
        console.error('Error getting CSRF token:', error);
        setError('Không thể kết nối đến server. Vui lòng đảm bảo server đang chạy.');
      }
    };

    getCsrfToken();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setError('Mật khẩu xác nhận không khớp!');
      setIsLoading(false);
      return;
    }
    
    if (!formData.agree) {
      setError('Vui lòng chấp nhận điều khoản người dùng!');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...');
        
        // Chuyển hướng đến trang login sau 2 giây
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        if (response.status === 422) {
          const validationErrors = Object.values(data.errors).flat();
          setError(validationErrors.join(', '));
        } else {
          setError(data.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('Không thể kết nối đến server. Vui lòng kiểm tra:\n1. Server Laravel đang chạy\n2. URL API đúng\n3. CORS đã được cấu hình');
    } finally {
      setIsLoading(false);
    }
  };
  
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />

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
                        name="name"
                        placeholder="Họ và tên" 
                        value={formData.name}
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
                        name="password_confirmation"
                        placeholder="Xác nhận mật khẩu" 
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="university"
                        placeholder="Trường đại học" 
                        value={formData.university}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="department"
                        placeholder="Khoa/Phòng ban" 
                        value={formData.department}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        name="student_id"
                        placeholder="Mã sinh viên" 
                        value={formData.student_id}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control 
                        as="textarea" 
                        name="bio"
                        placeholder="Giới thiệu bản thân" 
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                      />
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
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="py-2"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
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