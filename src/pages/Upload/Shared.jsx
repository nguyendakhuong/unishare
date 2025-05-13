import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Shared.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import documentImage from '../../assets/images/image53.png';

const Shared = () => {
  const [weeklyFiles, setWeeklyFiles] = useState([]);
  const [monthlyFiles, setMonthlyFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSharedDocuments();
  }, []);

  const fetchSharedDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/student/documents', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          shared: true
        }
      });

      // Phân loại tài liệu theo thời gian
      const now = new Date();
      const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

      const weekly = [];
      const monthly = [];

      response.data.data.forEach(doc => {
        const docDate = new Date(doc.created_at);
        if (docDate >= oneWeekAgo) {
          weekly.push(doc);
        } else if (docDate >= oneMonthAgo) {
          monthly.push(doc);
        }
      });

      setWeeklyFiles(weekly);
      setMonthlyFiles(monthly);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shared documents:', error);
      setError('Không thể tải danh sách tài liệu được chia sẻ. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  const handleDownload = async (documentId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/student/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Không thể tải xuống tài liệu. Vui lòng thử lại sau.');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <>
      <Header />

      <div className="d-flex main-content">
        <SideBar />

        <Container className="main-container">
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <h2 className="page-title text-start">Được chia sẻ</h2>
          
          <div className="section mb-55">
            <h3 className="section-title text-start">Tuần trước</h3>
            <Row className="g-4 justify-content-center">
              {weeklyFiles.map((file) => (
                <Col key={file.id} md={4} lg={3}>
                  <Card className="h-100 file-card">
                    <Card.Body>
                      <Card.Title className="h5">{file.title}</Card.Title>
                      <img 
                        src={file.preview_url || documentImage} 
                        alt={file.title} 
                        className="img-fluid mt-3"
                        onClick={() => handleDownload(file.id, file.file_name)}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="file-info mt-2">
                        <small>Kích thước: {Math.round(file.file_size / 1024)} KB</small>
                        <br />
                        <small>Ngày chia sẻ: {new Date(file.created_at).toLocaleDateString()}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {weeklyFiles.length === 0 && (
                <Col>
                  <p className="text-muted text-center">Không có tài liệu nào được chia sẻ trong tuần này</p>
                </Col>
              )}
            </Row>
          </div>

          <div className="section">
            <h3 className="section-title text-start">Tháng trước</h3>
            <Row className="g-4 justify-content-center">
              {monthlyFiles.map((file) => (
                <Col key={file.id} md={4} lg={3}>
                  <Card className="h-100 file-card">
                    <Card.Body>
                      <Card.Title className="h5">{file.title}</Card.Title>
                      <img 
                        src={file.preview_url || documentImage} 
                        alt={file.title} 
                        className="img-fluid mt-3"
                        onClick={() => handleDownload(file.id, file.file_name)}
                        style={{ cursor: 'pointer' }}
                      />
                      <div className="file-info mt-2">
                        <small>Kích thước: {Math.round(file.file_size / 1024)} KB</small>
                        <br />
                        <small>Ngày chia sẻ: {new Date(file.created_at).toLocaleDateString()}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {monthlyFiles.length === 0 && (
                <Col>
                  <p className="text-muted text-center">Không có tài liệu nào được chia sẻ trong tháng này</p>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Shared;