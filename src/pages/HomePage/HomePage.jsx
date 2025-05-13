import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import Header from '../Header/Header';
import logo from '../../assets/images/logo.png';
import myImage from '../../assets/images/image 46.png';
import HomeImage from '../../assets/images/image 2.png';
import Vector from '../../assets/images/Vector.png';
import HomeImage1 from '../../assets/images/image 3.png';
import HomeImage2 from '../../assets/images/hinh1.jpg';
import HomeImage3 from '../../assets/images/image53.png';
import facebook from '../../assets/images/facebook.png';
import youtube from '../../assets/images/youtube.png';
import instagram from '../../assets/images/Instagram.png';
import { documentAPI, groupAPI } from '../../services/api';

const HomePage = () => {
  const [documents, setDocuments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vui lòng đăng nhập để xem nội dung');
          setLoading(false);
          return;
        }

        // Fetch documents
        const documentsResponse = await fetch('http://localhost/cappppp1/api.php/documents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!documentsResponse.ok) {
          if (documentsResponse.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            navigate('/login');
            return;
          }
          throw new Error(`Server error: ${documentsResponse.status}`);
        }

        const documentsData = await documentsResponse.json();
        if (documentsData.data && Array.isArray(documentsData.data)) {
          setDocuments(documentsData.data);
        } else {
          setDocuments([]);
        }

        // Fetch featured groups
        const groupsResponse = await fetch('http://localhost/cappppp1/api.php/groups', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (groupsResponse.ok) {
          const groupsData = await groupsResponse.json();
          setGroups(groupsData.data || []);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Header />

      {/* Search Container */}
      <Container className="search-container">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <InputGroup className="search-box">
              <Form.Control
                placeholder="Tìm kiếm tài liệu, nhóm, ..."
                aria-label="Search"
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="rounded-pill mx-2">Nhóm của tôi</Button>
            <Link to="/upload" className="btn btn-outline-primary rounded-pill mx-2">Tải tài liệu</Link>
          </Col>
        </Row>
      </Container>

      {/* Hero Section */}
      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="hero-content">
              <h1 className="fw-bold">Chào mừng bạn đến với <span className="text-primary">UNISHARE 🚀</span></h1>
              <h2 className="fw-bold">Nền tảng học tập và chia sẻ tri thức hiện đại! 🚀</h2>
              <p className="my-4">
                Kết nối, học hỏi, và phát triển cùng cộng đồng giáo dục năng động. Chia sẻ tài liệu, 
                tham gia nhóm học tập, và trao đổi kiến thức dễ dàng hơn bao giờ hết.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg">Đăng ký ngay →</Link>
            </Col>
            <Col md={6} className="hero-image text-center">
              <img src={HomeImage} alt="Học tập cùng UNISHARE" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-4">
        <Container>
          <Row className="justify-content-center">
            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-box text-center h-100 p-4">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <img src={Vector} alt="star icon" className="feature-icon mb-3" />
                  <Card.Text className="fw-bold">Trải nghiệm tốt nhất</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-box text-center h-100 p-4">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <img src={Vector} alt="money icon" className="feature-icon mb-3" />
                  <Card.Text className="fw-bold">Chi phí hợp lý</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-box text-center h-100 p-4">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <img src={Vector} alt="settings icon" className="feature-icon mb-3" />
                  <Card.Text className="fw-bold">Vận hành ổn định</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="feature-box text-center h-100 p-4">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <img src={Vector} alt="robot icon" className="feature-icon mb-3" />
                  <Card.Text className="fw-bold">Tự động hóa cao</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h4 className="text-secondary mb-2">Vì sao nên chọn</h4>
              <h2 className="fw-bold">
                <span className="text-primary">UNISHARE</span> để học tập ?
              </h2>
            </Col>
          </Row>
          
          <Row className="align-items-center">
            <Col lg={4}>
              <div className="mb-5">
                <h3 className="text-primary fs-5 fw-bold">📊 Hệ sinh thái đa dạng</h3>
                <p><strong>UNISHARE</strong> hướng tới xây dựng và phát triển hệ sinh thái học tập trực tuyến trên nhiều lĩnh vực, dành cho tất cả người dùng sử dụng trang web.</p>
              </div>
              <div>
                <h3 className="text-primary fs-5 fw-bold">📖 Kiến thức đến từ các chuyên gia hàng đầu</h3>
                <p><strong>UNISHARE</strong> chọn hợp tác với chuyên gia hàng đầu trong các lĩnh vực để cung cấp đến bạn kiến thức chất lượng, chính xác.</p>
              </div>
            </Col>
            
            <Col lg={4} className="text-center">
              <img src={HomeImage1} alt="Học tập cùng UNISHARE" className="img-fluid mb-4" />
              <Link to="/register" className="btn btn-primary">Đăng ký ngay →</Link>
            </Col>
            
            <Col lg={4}>
              <div className="mb-5">
                <h3 className="text-primary fs-5 fw-bold">🎭 Nội dung phong phú, đa dạng</h3>
                <p>Bạn có thể học ngoại ngữ, ôn luyện kiến thức, học kỹ năng mềm... Bạn cũng có thể học tập nâng cao kiến thức để phát triển nghề nghiệp của bạn với <strong>UNISHARE</strong>.</p>
              </div>
              <div>
                <h3 className="text-primary fs-5 fw-bold">💬 Kết nối với bạn 24/7</h3>
                <p>Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng lắng nghe và giải đáp tất cả các thắc mắc của bạn.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Banner Section */}
      <section className="py-5">
        <Container>
          <Card className="text-center p-5 gradient-banner">
            <Card.Body>
              <Card.Title className="text-white mb-4 fs-4 fw-bold">Hãy theo dõi các nhóm học và tham gia cùng nhau học tập nhé!</Card.Title>
              <Button variant="light" className="text-primary fw-bold">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png" alt="icon" width="16" height="16" className="me-2" />
                Tham gia nhóm học
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* Group Section */}
      <section className="group-section py-5 bg-light">
        <Container>
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="fw-bold">Nhóm Học Được Quan Tâm</h2>
            </Col>
            <Col xs="auto">
              <Link to="/groups" className="text-primary fw-bold text-decoration-none">Xem Tất Cả Các Nhóm Học</Link>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <Row>
              {groups.map((group) => (
                <Col lg={3} md={6} className="mb-4" key={group.id}>
                  <Card className="group-card h-100 shadow-sm">
                    <Card.Img variant="top" src={group.imageUrl || HomeImage2} />
                    <Card.Body>
                      <Card.Title>{group.name}</Card.Title>
                      <Card.Text><strong>Giáo Viên:</strong> {group.teacherName}</Card.Text>
                      <div className="text-warning">
                        ⭐⭐⭐⭐⭐ ({group.rating}) {group.memberCount}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Document Section */}
      <section className="document-section py-5">
        <Container>
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="fw-bold"><em>Tài liệu hàng đầu dành cho bạn</em></h2>
            </Col>
            <Col md="auto">
              <Link to="/upload" className="btn btn-outline-primary me-3">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png" alt="icon" width="16" height="16" className="me-2" />
                Tải tài liệu của bạn
              </Link>
            </Col>
            <Col xs="auto">
              <Link to="/documents" className="text-primary fw-bold text-decoration-none">Xem Tiếp →</Link>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <Row className="document-row overflow-auto flex-nowrap pb-3">
              {documents.map((document) => (
                <Col md={3} key={document.id} className="document-col">
                  <Card className="document-card h-100 shadow-sm">
                    <Card.Img variant="top" src={document.imageUrl || HomeImage3} />
                    <Card.Body>
                      <Card.Title className="fs-6">{document.title}</Card.Title>
                      <Card.Text className="small">{document.category}</Card.Text>
                      <div className="small fw-bold">❤️ {document.likes}%({document.ratings})</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">Học Viên Nói Gì Khi Sử Dụng <span className="text-primary">UNISHARE</span></h2>
          
          <Row>
            {[1, 2, 3].map((item) => (
              <Col md={4} className="mb-4" key={item}>
                <Card className="testimonial-card h-100 bg-primary-light">
                  <Card.Body className="text-center position-relative pt-5">
                    <div className="avatar-container">
                      <img src={HomeImage2} alt="Học viên" className="avatar" />
                    </div>
                    <Card.Text className="fst-italic mb-3">💬 UNISHARE có rất nhiều ưu điểm vượt trội so với các ứng dụng học tập khác, tôi thực sự đã tìm được và học tập những kiến thức bổ ích từ UNISHARE.</Card.Text>
                    <h4 className="fs-5 fw-bold">Trần Văn A</h4>
                    <p className="text-muted small">Sinh Viên Bách Khoa Đà Nẵng</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* News Section */}
      <section className="news-section py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Tin Tức & Blog</h2>
          
          <Row>
            {[1, 2, 3, 4].map((item) => (
              <Col lg={6} className="mb-4" key={item}>
                <Card className="news-card h-100 shadow-sm">
                  <Card.Body className="p-0">
                    <Row className="g-0">
                      <Col xs={4}>
                        <img src={HomeImage2} alt="Tin tức" className="img-fluid h-100 news-img" />
                      </Col>
                      <Col xs={8}>
                        <div className="p-3">
                          <h5 className="fs-6 fw-bold mb-2">
                            Lãnh đạo Tập đoàn VNPT tham gia chương trình báo cáo kết quả học tập của 2 lớp bồi dưỡng kiến thức chuyển đổi số quốc tế
                          </h5>
                          <p className="text-muted small mb-2">⏱ 11:25:13 | 04/11/2021</p>
                          <p className="small">
                            Ngày 28/10/2021, Hội đồng thành viên, Ban Tổng Giám đốc Tập đoàn đã tham dự chương trình báo cáo kết quả học tập của 2 lớp bồi dưỡng kiến thức chuyển đổi số...
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer bg-white py-4 mt-4">
        <Container>
          <div className="mb-44">
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
              <h3 className="fs-5 mb-33">Theo Dõi Chúng Tôi</h3>
              <div className="mb-3">
                <img src={facebook} alt="Facebook" className="me-2" width="30" height="30" />
                <img src={youtube} alt="YouTube" className="me-2" width="30" height="30" />
                <img src={instagram} alt="Instagram" width="30" height="30" />
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

export default HomePage;