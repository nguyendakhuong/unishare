import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './My-files.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/SideBar';
import documentImage from '../../assets/images/image53.png';

const MyFiles = () => {
  // Sample data for files
  const topFiles = [
    { id: 1, title: 'Tài liệu Toán cao cấp', description: 'File chứa các bài tập và lý thuyết.' },
    { id: 2, title: 'Tài liệu Toán cao cấp', description: 'File chứa các bài tập và lý thuyết.' },
    { id: 3, title: 'Tài liệu Toán cao cấp', description: 'File chứa các bài tập và lý thuyết.' },
  ];

  const bottomFiles = [
    { id: 4, title: 'Ôn tập thi trắc nghiệm...', image: documentImage },
    { id: 5, title: 'Ôn tập thi trắc nghiệm...', image: documentImage },
    { id: 6, title: 'Ôn tập thi trắc nghiệm...', image: documentImage },
  ];

  return (
    <>
      <Header />

      <div className="d-flex myfiles-content">
        <Sidebar />

        <Container className="myfiles-container">
          <h2 className="myfiles-title">File của tôi</h2>
          
          <div className="file-container">
            <Row className="mb-5">
              {topFiles.map((file) => (
                <Col key={file.id} md={4}>
                  <Card className="h-100 myfiles-card">
                    <Card.Body>
                      <Card.Title>{file.title}</Card.Title>
                      <Card.Text>{file.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row>
              {bottomFiles.map((file) => (
                <Col key={file.id} md={4}>
                  <Card className="h-100 myfiles-card">
                    <Card.Body>
                      <Card.Title>{file.title}</Card.Title>
                      <img src={file.image} alt="Hình minh họa" className="img-fluid mt-3" />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default MyFiles;