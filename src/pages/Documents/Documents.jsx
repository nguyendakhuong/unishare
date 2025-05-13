import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { documentAPI } from '../../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await documentAPI.getDocuments();
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách tài liệu');
        setLoading(false);
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Danh sách tài liệu</h2>
      <Row>
        {documents.map((doc) => (
          <Col md={4} key={doc.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{doc.title}</Card.Title>
                <Card.Text>{doc.description}</Card.Text>
                <Card.Text className="text-muted">
                  <small>Ngày tạo: {new Date(doc.created_at).toLocaleDateString()}</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Documents; 