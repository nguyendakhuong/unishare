import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loading.css';
import Header from '../Header/Header';
import Sidebar from '../SideBar/SideBar';

// Import images (adjust paths based on your project structure)
import logoImage from '../../assets/images/logo.png';
import uploadFileIcon from '../../assets/images/image 19.png';
import uploadFolderIcon from '../../assets/images/image 20.png';
import shareIcon2 from '../../assets/images/image 21.png';
import uploadAreaIcon from '../../assets/images/image 163.png';
import filePreviewImage from '../../assets/images/image53.png';
import facebookIcon from '../../assets/images/facebook.png';
import youtubeIcon from '../../assets/images/youtube.png';
import instagramIcon from '../../assets/images/Instagram.png';

const Loading = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [recentUploads, setRecentUploads] = useState([]);

  // Xử lý kéo thả file
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFolderSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    setSelectedFiles(files);
    await uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/student/documents', formData, {
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
        message: 'Tải lên thành công!',
        type: 'success'
      });

      // Cập nhật danh sách tệp gần đây
      fetchRecentUploads();

      // Chuyển hướng sau khi upload thành công
      setTimeout(() => {
        navigate('/my-files');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.message || 'Có lỗi xảy ra khi tải lên',
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
      setSelectedFiles([]);
    }
  };

  // Lấy danh sách tệp đã tải lên gần đây
  const fetchRecentUploads = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/student/documents/recent', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRecentUploads(response.data.data.slice(0, 3)); // Lấy 3 tệp gần nhất
    } catch (error) {
      console.error('Error fetching recent uploads:', error);
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

          <div className="button-container">
            <Button className="upload-button">
              <label htmlFor="file-upload" className="mb-0 d-flex align-items-center">
                <img src={uploadFileIcon} alt="Tải tệp lên" /> Tải tệp lên
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </Button>

            <Button className="upload-button">
              <label htmlFor="folder-upload" className="mb-0 d-flex align-items-center">
                <img src={uploadFolderIcon} alt="Tải thư mục" /> Tải thư mục
              </label>
              <input
                id="folder-upload"
                type="file"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderSelect}
                style={{ display: 'none' }}
              />
            </Button>

            <Button className="upload-button">
              <img src={shareIcon2} alt="Chia sẻ" /> Chia sẻ
            </Button>
          </div>

          <div 
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isLoading ? (
              <div className="loading-progress">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                <div className="progress-text">{uploadProgress}%</div>
                <div className="files-info">
                  {selectedFiles.map(file => (
                    <div key={file.name} className="file-item">
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <img src={uploadAreaIcon} alt="Upload Icon" />
                <div className="upload-text">Tải lên hoặc kéo thả</div>
              </>
            )}
          </div>

          <div className="file-container">
            <h3>Tệp đã tải lên gần đây</h3>
            <Row>
              {recentUploads.map((file, index) => (
                <Col md={4} key={file.id || index}>
                  <Card className="file-card">
                    <Card.Body>
                      <Card.Title>{file.title}</Card.Title>
                      <img 
                        src={file.preview_url || filePreviewImage} 
                        alt={file.title}
                        className="file-preview-img"
                      />
                      <div className="file-info">
                        <small>Kích thước: {Math.round(file.file_size / 1024)} KB</small>
                        <small>Ngày tải lên: {new Date(file.created_at).toLocaleDateString()}</small>
                      </div>
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