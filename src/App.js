import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Resgister/Register';
import HomePage from './pages/HomePage/HomePage';
import Account from './pages/Account/Account';
import EditProfile from './pages/Account/Edit-Frofile';
import ChangePassword from './pages/Account/Change-Password'
import Upload from './pages/Upload/Upload';
import Loading from './pages/Upload/Loading';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/loading" element={<Loading />} />c 
        <Route path="/" element={<HomePage />} />
       
      </Routes>
    </div>
  );
}

export default App;
