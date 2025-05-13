import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth pages
import Login from './pages/Login/Login';
import Register from './pages/Resgister/Register';

// Main pages
import HomePage from './pages/HomePage/HomePage';

// User Account pages
import Account from './pages/Account/Account';
import EditProfile from './pages/Account/Edit-Frofile';
import ChangePassword from './pages/Account/Change-Password';

// Upload & File Management
import Upload from './pages/Upload/Upload';
import Loading from './pages/Upload/Loading';
import Trash from './pages/Upload/Trash';
import Shared from './pages/Upload/Shared';
import History from './pages/Upload/History';
import MyFiles from './pages/Upload/My-files';

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Account Routes */}
        <Route path="/account" element={<Account />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* File Management Routes */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/my-files" element={<MyFiles />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/history" element={<History />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </div>
  );
}

export default App;
