import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Register from './pages/Resgister/Register';
import Home from './pages/Home/Home';
// ... other imports ...

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 