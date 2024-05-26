// App.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminDashboard from './components/Admin/AdminDashboard';
import MyProfile from './components/Student/MyProfile';
import AdminLogin from './components/Auth/AdminLogin';
import StudentLogin from './components/Auth/StudentLogin';
import StudentSignup from './components/Auth/StudentSignup';
import ReadmePage from './components/ReadmePage';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


const App = () => {
  return (
<Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />

          {/* Student Routes */}
          <Route path="/student/login" element={<StudentLogin/>} />
          <Route path="/student/signup" element={<StudentSignup/>} />
          <Route path="/student/profile" element={<MyProfile/>} />

          <Route path="/documentation" element={<ReadmePage/>} />
          <Route path="/" element={<StudentLogin/>} />
        </Routes>
      </AuthProvider>
      </Router>
  );
};

export default App;
