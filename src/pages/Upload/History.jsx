import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './History.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/SideBar';

const History = () => {
  // Sample data for upload history
  const uploadHistory = [
    { id: 1, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 2, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 3, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 4, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 5, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 6, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 7, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
    { id: 8, name: 'Toán cao cấp.world', access: 'Chỉ có bạn', datetime: 'Ngày 12/04/2025, 12:00' },
  ];

  return (
    <>
      <Header />

      <div className="d-flex history-content">
        <Sidebar />

        <Container className="history-container">
          <h2 className="history-title">Lịch sử upload</h2>
          <Table responsive hover className="history-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Ai có quyền truy cập</th>
                <th>Ngày giờ</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.access}</td>
                  <td>{item.datetime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default History;