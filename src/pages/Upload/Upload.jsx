import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Upload.css';
import Header from '../Header/Header';
// Import the Sidebar component
import Sidebar from '../SideBar/SideBar';
// Import other images as needed for file previews, etc.
import logo from '../../assets/images/logo.png';
import filePreviewImage from '../../assets/images/image53.png';
import facebookIcon from '../../assets/images/facebook.png';
import youtubeIcon from '../../assets/images/youtube.png';
import instagramIcon from '../../assets/images/Instagram.png';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedFolders, setRecommendedFolders] = useState([]);
  const [recommendedFiles, setRecommendedFiles] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch recommended content when component mounts
  useEffect(() => {
    fetchRecommendedContent();
  }, []);

  const fetchRecommendedContent = async () => {
    try {
      const [foldersResponse, filesResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/folders/recommended'),
        axios.get('http://localhost:3001/api/files/recommended')
      ]);

      setRecommendedFolders(foldersResponse.data);
      setRecommendedFiles(filesResponse.data);
    } catch (error) {
      console.error('Error fetching recommended content:', error);
      setAlert({
        show: true,
        message: 'Không thể tải nội dung đề xuất. Vui lòng thử lại sau.',
        type: 'danger'
      });
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setAlert({
        show: true,
        message: 'Vui lòng chọn file để tải lên',
        type: 'warning'
      });
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await axios.post('http://localhost:3001/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setAlert({
        show: true,
        message: 'Tải file lên thành công!',
        type: 'success'
      });
      setSelectedFiles([]);
      setUploadProgress(0);
      fetchRecommendedContent(); // Refresh recommended content
    } catch (error) {
      console.error('Upload error:', error);
      setAlert({
        show: true,
        message: 'Có lỗi xảy ra khi tải file. Vui lòng thử lại.',
        type: 'danger'
      });
    }
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const response = await axios.get(`http://localhost:3001/api/files/search?q=${e.target.value}`);
      setRecommendedFiles(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <>
      <Header />

      {/* Main Content */}
      <Container fluid className="main-container d-flex p-0">
        {/* Use the Sidebar component here */}
        <Sidebar />

        {/* Main Content */}
        <div className="content-area">
          {alert.show && (
            <Alert 
              variant={alert.type} 
              onClose={() => setAlert({ ...alert, show: false })} 
              dismissible
            >
              {alert.message}
            </Alert>
          )}

          <div className="content-header">
            <h1>Chào mừng bạn đến với <span className="highlight">UNISHARE!</span> 🎉</h1>
            <Form.Control 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="search-bar"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Upload Section */}
          <section className="content-section">
            <Card className="upload-card">
              <Card.Body>
                <Form.Group>
                  <Form.Label>Chọn file để tải lên</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="mb-3"
                  />
                </Form.Group>
                {uploadProgress > 0 && (
                  <ProgressBar 
                    now={uploadProgress} 
                    label={`${uploadProgress}%`} 
                    className="mb-3" 
                  />
                )}
                <Button 
                  variant="primary" 
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0}
                >
                  Tải lên
                </Button>
              </Card.Body>
            </Card>
          </section>

          {/* Recommended Folders Section */}
          <section className="content-section">
            <h2>Thư mục đề xuất</h2>
            <Row className="file-container">
              {recommendedFolders.map((folder, index) => (
                <Col md={4} key={folder.id || index}>
                  <Card className="file-card mb-3">
                    <Card.Body>
                      <Card.Title>{folder.name}</Card.Title>
                      <Card.Text>{folder.description}</Card.Text>
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
              {recommendedFiles.map((file, index) => (
                <Col md={4} key={file.id || index}>
                  <Card className="file-card mb-3">
                    <Card.Body className="text-center">
                      <Card.Title>{file.name}</Card.Title>
                      <img 
                        src={file.preview || filePreviewImage} 
                        alt={file.name} 
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