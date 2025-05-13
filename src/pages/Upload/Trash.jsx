import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Trash.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import trash from '../../assets/images/image 189.png';

const Trash = () => {
  return (
    <>
      <Header />

      <div className="d-flex" style={{ paddingTop: '120px' }}>
        <SideBar />

        <Container className="py-4">
          <h2 className="text-center mb-4">Thùng rác</h2>
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
            <img src={trash} alt="Thùng rác" className="opacity-50" style={{ width: '100px' }} />
            <div className="mt-3 text-muted">Không tìm thấy tệp nào đã xóa</div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Trash;