import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Form,
  Image,
  Alert,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Account.css";
import Header from "../Header/Header";
import logo from "../../assets/images/logo.png";
import AccountImage1 from "../../assets/images/image 5.png";
import AccountImage2 from "../../assets/images/image 6.png";
import AccountImage3 from "../../assets/images/image 7.png";
import AccountImage4 from "../../assets/images/image 8.png";
import AccountImage5 from "../../assets/images/image 9.png";
import AccountImage6 from "../../assets/images/image 10.png";
import AccountImage7 from "../../assets/images/image 11.png";
import AccountImage8 from "../../assets/images/image 12.png";
import facebook from "../../assets/images/facebook.png";
import youtube from "../../assets/images/youtube.png";
import instagram from "../../assets/images/Instagram.png";

const Account = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    school: "",
    major: "",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setProfileData({
        fullName: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        school: userData.school || "",
        major: userData.major || "",
      });
    } else {
      // Nếu không có dữ liệu user, chuyển về trang login
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cookies = document.cookie.split(";");
      const xsrfCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("XSRF-TOKEN=")
      );
      const csrfToken = xsrfCookie
        ? decodeURIComponent(xsrfCookie.split("=")[1])
        : "";

      const response = await fetch(
        "http://localhost:8000/api/auth/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
          },
          credentials: "include",
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        // Cập nhật dữ liệu trong localStorage
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            ...profileData,
          })
        );

        setAlertMessage("Cập nhật thông tin thành công!");
        setAlertVariant("success");
        setShowAlert(true);
      } else {
        const data = await response.json();
        setAlertMessage(data.message || "Cập nhật thất bại. Vui lòng thử lại!");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setAlertMessage("Có lỗi xảy ra. Vui lòng thử lại!");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    console.log("Image uploaded:", e.target.files[0]);
  };

  return (
    <>
      <Header />
      {showAlert && (
        <Alert
          variant={alertVariant}
          className="position-fixed top-0 start-50 translate-middle-x mt-5"
          style={{ zIndex: 9999 }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      {/* Main Content */}
      <Container fluid className="pt-5 mt-5">
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-primary text-white sidebar">
            <div className="user-profile text-center py-4">
              <Image
                src={AccountImage1}
                alt="Profile Picture"
                roundedCircle
                className="avatar mb-3"
                width={80}
                height={80}
              />
              <h5>{profileData.fullName}</h5>
              <p className="mb-0 small">{profileData.email}</p>
            </div>

            <Nav className="flex-column">
              <Nav.Link className="text-white d-flex align-items-center py-2">
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ cursor: "pointer", width: "100%" }}
                >
                  <img
                    src={AccountImage2}
                    alt="Hồ sơ cá nhân"
                    width="20"
                    height="20"
                    className="me-2"
                  />
                  <span>Hồ sơ cá nhân</span>
                  <span style={{ float: "right" }}>{menuOpen ? "▲" : "▼"}</span>
                </div>
              </Nav.Link>
              {menuOpen && (
                <ul className="submenu-items ps-4">
                  <li className="py-1">
                    <Link
                      to="/edit-profile"
                      className="text-white text-decoration-none"
                    >
                      Chỉnh sửa
                    </Link>
                  </li>
                  <li className="py-1">
                    <Link
                      to="/change-password"
                      className="text-white text-decoration-none"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                </ul>
              )}

              <Nav.Link
                as={Link}
                to="/documents"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage3}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Tài liệu
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/history"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage4}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Lịch sử tham gia
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/groups"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage5}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Nhóm học tham gia
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/guide"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage6}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Hướng dẫn sử dụng
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/settings"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage7}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Cài đặt
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/terms"
                className="text-white d-flex align-items-center py-2"
              >
                <img
                  src={AccountImage8}
                  alt=""
                  width="20"
                  height="20"
                  className="me-2"
                />
                Điều khoản người dùng
              </Nav.Link>
            </Nav>

            <div className="text-center mt-4 mb-3">
              <Button variant="light" className="logout-btn">
                Đăng Xuất
              </Button>
            </div>
          </Col>

          {/* Main Profile Content */}
          <Col md={9} lg={10}>
            <Row className="h-100">
              {/* Profile Details */}
              <Col md={8} className="profile-details p-4">
                <div className="profile-header">
                  <h2 className="text-primary">Thông tin cá nhân</h2>
                </div>

                <div className="profile-info">
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Họ và tên</label>
                        <div className="form-control bg-light">
                          {profileData.fullName}
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <div className="form-control bg-light">
                          {profileData.email}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Số điện thoại
                        </label>
                        <div className="form-control bg-light">
                          {profileData.phone || "Chưa cập nhật"}
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Địa chỉ</label>
                        <div className="form-control bg-light">
                          {profileData.address || "Chưa cập nhật"}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Trường</label>
                        <div className="form-control bg-light">
                          {profileData.school || "Chưa cập nhật"}
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Ngành học</label>
                        <div className="form-control bg-light">
                          {profileData.major || "Chưa cập nhật"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-white py-4 mt-5">
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
                  <Link
                    to="/about"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Về UNISHARE
                  </Link>
                  <Link
                    to="/teachers"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Giảng Viên
                  </Link>
                  <Link
                    to="/group"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Group
                  </Link>
                </Col>
                <Col xs={6}>
                  <Link
                    to="/news"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Tin Tức
                  </Link>
                  <Link
                    to="/support"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Hỗ Trợ
                  </Link>
                  <Link
                    to="/documents"
                    className="d-block text-decoration-none text-primary mb-2"
                  >
                    Tài Liệu
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <h3 className="fs-5 mb-3">Theo Dõi Chúng Tôi</h3>
              <div className="mb-3">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="me-2"
                  width="30"
                  height="30"
                />
                <img
                  src={youtube}
                  alt="YouTube"
                  className="me-2"
                  width="30"
                  height="30"
                />
                <img src={instagram} alt="Instagram" width="30" height="30" />
              </div>
              <Link
                to="/privacy"
                className="d-block text-decoration-none text-primary mb-2"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="d-block text-decoration-none text-primary mb-2"
              >
                Điều khoản dịch vụ
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Account;
