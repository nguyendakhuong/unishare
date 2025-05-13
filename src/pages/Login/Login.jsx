import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Header from '../Header/Header';
import myImage from '../../assets/images/image 42.png';
import chuong from '../../assets/images/chuong.png';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import github from '../../assets/images/github.png';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const Login = () => {
  const { login, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Hàm xử lý logout
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      logout();
      setSuccess('Đăng xuất thành công! Đang chuyển hướng...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Đăng xuất thất bại. Vui lòng thử lại sau.');
    }
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
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(formData);
      const data = response.data;
      
      if (data.token) {
        // Lưu token
        localStorage.setItem('token', data.token);
        
        // Lưu dữ liệu user vào localStorage
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Sử dụng AuthContext để lưu thông tin user
        login(userData);
        
        // Hiển thị thông báo thành công
        setSuccess(`Xin chào ${userData.name}! Đăng nhập thành công! Đang chuyển hướng...`);
        
        // Chuyển hướng đến trang chủ sau 2 giây
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        if (error.response.status === 422) {
          const validationErrors = Object.values(error.response.data.errors).flat();
          setError(validationErrors.join(', '));
        } else if (error.response.status === 401) {
          setError('Email hoặc mật khẩu không chính xác');
        } else if (error.response.status === 403) {
          setError('Tài khoản của bạn đã bị khóa');
        } else {
          setError(error.response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      } else {
        setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
      }
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
                  {success && <Alert variant="success">{success}</Alert>}
                  
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
                      <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                      </Button>
                    </div>
                  </Form>
                  
                  <p className="text-center mt-4 mb-3">Đăng Nhập Với</p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <img src={facebook} alt="Facebook" className="social-icon" />
                    <img src={google} alt="Google" className="social-icon" />
                    <img src={github} alt="Github" className="social-icon" />
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
    </>
  );
};

export default Login;