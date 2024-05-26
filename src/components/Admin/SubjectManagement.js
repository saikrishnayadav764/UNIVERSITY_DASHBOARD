// SubjectManagement.js
import React, { useState, useEffect } from 'react';
import subjectService from '../../services/subjectService';
import { useAuth } from '../../contexts/AuthContext';

const SubjectManagement = () => {
  const [currSubjects, setCurrSubjects] = useState([]);
  const { setSubjects, currfields } = useAuth();
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await subjectService.getSubjects();
      setCurrSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleCreateSubject = async () => {
    if (!newSubjectName || !selectedFieldId) {
      console.error('Both subject name and code are required.');
      return;

    }
    try {
      const response = await subjectService.createSubject(newSubjectName, selectedFieldId );
      setCurrSubjects([...currSubjects, response.data]);
      setSubjects([...currSubjects, response.data]);
      setNewSubjectName('');
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await subjectService.deleteSubject(id);
      setCurrSubjects(currSubjects.filter((subject) => subject.id !== id));
      setSubjects(currSubjects.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Subject Management</h2>
      <div className="card p-4 mb-4">
        <h3 className="card-title">Add New Subject</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="Subject name"
          />

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
          <button className="btn btn-primary" onClick={handleCreateSubject}>
            Create
          </button>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="card-title">Subjects</h3>
        <ul className="list-group">
          {currSubjects.map((subject) => (
            <li key={subject.id} className="list-group-item d-flex justify-content-between align-items-center">
              {subject.name} ({subject.id})
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSubject(subject.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectManagement;