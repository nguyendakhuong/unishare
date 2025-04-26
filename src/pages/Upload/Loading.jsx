import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Loading.css';

// Import images (adjust paths based on your project structure)
import logoImage from '../../assets/images/logo.png';
import bellIcon from '../../assets/images/chuong.png';
import uploadFileIcon from '../../assets/images/image 19.png';
import uploadFolderIcon from '../../assets/images/image 20.png';
import shareIcon2 from '../../assets/images/image 21.png';
import uploadAreaIcon from '../../assets/images/image 163.png';
import filePreviewImage from '../../assets/images/image53.png';
import facebookIcon from '../../assets/images/facebook.png';
import youtubeIcon from '../../assets/images/youtube.png';
import instagramIcon from '../../assets/images/Instagram.png';
import Sidebar from '../SideBar/SideBar';
const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event) => {
    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <>
      {/* Header */}
      <Navbar expand="lg" className="bg-white shadow-sm py-2 fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoImage} alt="UNISHARE Logo" height="70" className="logo-img" />
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
                <img src={bellIcon} alt="Thông báo" width="30" height="30" />
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
          {/* Search bar */}
          

          {/* Recommended Folders Section */}
          {/* <div className="file-container">
            {[
              {
                title: "Tài liệu Toán cao cấp",
                description: "File chứa lý thuyết và bài tập."
              },
              {
                title: "Tài liệu Toán cao cấp",
                description: "File chứa lý thuyết và bài tập."
              },
              {
                title: "Tài liệu Toán cao cấp",
                description: "File chứa lý thuyết và bài tập."
              },
              {
                title: "Tài liệu Toán cao cấp",
                description: "File chứa lý thuyết và bài tập."
              },
              {
                title: "Tài liệu Vật lý",
                description: "File ôn tập cho kỳ thi."
              },
              {
                title: "Tài liệu Hóa học",
                description: "File hướng dẫn thực hành."
              }
            ].map((item, index) => (
              <div className="file-card" key={index}>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
            ))}
          </div> */}

          <div className="button-container">
            <Button className="upload-button" onClick={handleFileUpload}>
              <img src={uploadFileIcon} alt="Tải tệp lên" /> Tải tệp lên
            </Button>
            <Button className="upload-button" onClick={handleFileUpload}>
              <img src={uploadFolderIcon} alt="Tải thư mục" /> Tải thư mục
            </Button>
            <Button className="upload-button">
              <img src={shareIcon2} alt="Chia sẻ" /> Chia sẻ
            </Button>
          </div>
          {/* <h2 className="section-title">Thư mục đề xuất</h2> */}

          <div className="upload-area">
            {isLoading ? (
              <div className="loading-progress">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                <div className="progress-text">{uploadProgress}%</div>
              </div>
            ) : (
              <>
                <img src={uploadAreaIcon} alt="Upload Icon" />
                <div className="upload-text">Tải lên hoặc kéo thả</div>
              </>
            )}
          </div>

          <div className="file-container">
            <Row>
              {[...Array(3)].map((_, index) => (
                <Col md={4} key={`file-${index}`}>
                  <Card className="file-card">
                    <Card.Body>
                      <Card.Title>Ôn tập thi trắc nghiệm {index + 1}</Card.Title>
                      <img 
                        src={filePreviewImage} 
                        alt={`Ôn tập thi trắc nghiệm ${index + 1}`}
                        className="file-preview-img"
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="bg-white py-4 mt-5">
        <Container>
          <div className="mb-4">
            <img src={logoImage} alt="UNISHARE Logo" height="80" />
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
                <img src={facebookIcon} alt="Facebook" className="me-2" width="30" height="30" />
                <img src={youtubeIcon} alt="YouTube" className="me-2" width="30" height="30" />
                <img src={instagramIcon} alt="Instagram" width="30" height="30" />
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

export default Loading;