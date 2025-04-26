// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SideBar.css';

// Import your icons
import homeIcon from '../../assets/images/image 170.png';
import uploadIcon from '../../assets/images/image 171.png';
import fileIcon from '../../assets/images/image 172.png';
import historyIcon from '../../assets/images/image 173.png';
import shareIcon from '../../assets/images/image 174.png';
import trashIcon from '../../assets/images/image 175.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/upload" className="sidebar-link active">
          <img src={homeIcon} alt="Home" /> Trang chủ
        </Nav.Link>
        <Nav.Link as={Link} to="/loading" className="sidebar-link">
          <img src={uploadIcon} alt="Upload" /> Upload tài liệu
        </Nav.Link>
        <Nav.Link as={Link} to="/my-files" className="sidebar-link">
          <img src={fileIcon} alt="Files" /> File của tôi
        </Nav.Link>
        <Nav.Link as={Link} to="/history" className="sidebar-link">
          <img src={historyIcon} alt="History" /> Lịch sử sử dụng
        </Nav.Link>
        <Nav.Link as={Link} to="/shared" className="sidebar-link">
          <img src={shareIcon} alt="Shared" /> Được chia sẻ
        </Nav.Link>
        <Nav.Link as={Link} to="/trash" className="sidebar-link">
          <img src={trashIcon} alt="Trash" /> Thùng rác
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;