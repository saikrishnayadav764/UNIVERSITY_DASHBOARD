// MyProfile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MyPerformance from './MyPerformance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {
  const {currentUser, setCurrentUser} = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(!Cookies.get('token')){
      navigate('/admin/login');
      return
    }
  },[])

  const handleSignOut = () => {
    // Removing token cookie
    Cookies.remove('token');
    // Resetting current user state
    setCurrentUser(null);
    // Navigating to student login page
    navigate('/student/login');
  };



  useEffect(() => {
    setLoading(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">My Profile</h2>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Username: {currentUser.data.username }</p>
            <p className="card-text">Enrollment Year: {currentUser.data.enrollmentYear}</p>
            <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <MyPerformance />
      )}
    </>
  );
};

export default MyProfile;
