// MyPerformance.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../services/studentService';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyPerformance = () => {
  const { currentUser,subjects } = useAuth();
  const [marks, setMarks] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // if(!Cookies.get('token')){
    //   navigate('/admin/login');
    //   return
    // }
    const fetchMarks = async () => {
      try {
        const response = await studentService.getStudentById(currentUser.data.id);
        const dt = await response.data;
        setMarks(dt.marks);
      } catch (error) {
        console.error('Error fetching marks:', error);
        // Handling error
      }
    };

    fetchMarks();
  }, [currentUser.id]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Performance</h2>
      <div className="card border">
        <div className="card-body">
          <table className="table border table-bordered table-hover">
            <thead className="table">
              <tr>
                <th>Subject Id</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => (
                <tr key={index}>
                  <td>{subjects.find((subject) => subject.id === mark.subjectId)?.name || mark.subjectId}</td>
                  <td>{mark.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;
