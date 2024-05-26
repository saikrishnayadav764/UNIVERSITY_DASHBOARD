// AdminDashboard.js
import React, { useEffect } from 'react';
import FieldManagement from './FieldManagement';
import SubjectManagement from './SubjectManagement';
import StudentManagement from './StudentManagement';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ChartsComponent from './ChartsComponent';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!Cookies.get('token')){
      navigate('/admin/login');
    }
  },[])
  
  const handleSignOut = () => {

    Cookies.remove('token');

    navigate('/admin/login');
  };
  return (
    <div className="container mt-5 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome to Admin Dashboard</h1>
        <button onClick={handleSignOut} className="btn btn-danger">Sign Out</button>
      </div>
      <ul className="nav nav-tabs" id="adminDashboardTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="fields-tab" data-bs-toggle="tab" data-bs-target="#fields" type="button" role="tab" aria-controls="fields" aria-selected="true">Fields</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="subjects-tab" data-bs-toggle="tab" data-bs-target="#subjects" type="button" role="tab" aria-controls="subjects" aria-selected="false">Subjects</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="students-tab" data-bs-toggle="tab" data-bs-target="#students" type="button" role="tab" aria-controls="students" aria-selected="false">Students</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="analytics-tab" data-bs-toggle="tab" data-bs-target="#analytics" type="button" role="tab" aria-controls="analytics" aria-selected="false">Analytics</button>
        </li>
      </ul>
      <div className="tab-content" id="adminDashboardTabContent">
        <div className="tab-pane fade show active" id="fields" role="tabpanel" aria-labelledby="fields-tab">
          <FieldManagement />
        </div>
        <div className="tab-pane fade" id="subjects" role="tabpanel" aria-labelledby="subjects-tab">
          <SubjectManagement />
        </div>
        <div className="tab-pane fade" id="students" role="tabpanel" aria-labelledby="students-tab">
          <StudentManagement />
        </div>
        <div className="tab-pane fade" id="analytics" role="tabpanel" aria-labelledby="analytics-tab">
          <ChartsComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
