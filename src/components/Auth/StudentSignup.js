// StudentSignup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';


const StudentSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentYear, setEnrollmentYear] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const {  currfields } = useAuth();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signupStudent(username, password, enrollmentYear, selectedFieldId);
      // Redirecting to student login or profile upon successful signup
      navigate('/student/login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handling signup error 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Student Signup</h2>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enrollmentYear" className="form-label">
                    Enrollment Year:
                  </label>
                  <input
                    type="number"
                    id="enrollmentYear"
                    value={enrollmentYear}
                    onChange={(e) => setEnrollmentYear(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fieldId" className="form-label">
                    Field:
                  </label>

                  <select
                    className="form-control mb-2"
                    value={selectedFieldId}
                    onChange={(e) => setSelectedFieldId(e.target.value)}
                  >
                    <option value="">Select Field</option>
                    {currfields.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/student/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
