import React, { useState, useEffect } from 'react';
import studentService from '../../services/studentService';
import markService from '../../services/markService';
import { useAuth } from '../../contexts/AuthContext';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null)
  const [selectedMarks, setSelectedMarks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { subjects } = useAuth();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentMarks = async (studentId) => {
    try {
      const response = await markService.getMarksByStudentId(studentId);
      const dt = await response.data;
      setSelectedMarks(dt.marks);
    } catch (error) {
      console.error('Error fetching student marks:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEditMarks = async () => {
    try {
      const validMarks = selectedMarks.filter(mark => mark && mark.subjectId && mark.marks !== undefined);
      console.log(validMarks)
      await Promise.all(
        validMarks.map((mark) =>
          markService.updateMark({
            studentId: mark.studentId,
            subjectId: mark.subjectId,
            marks: mark.marks,
          })
        )
      );
      setSelectedStudent(null);
      setSelectedMarks([]);
      fetchStudents(); // Refreshing the student list to reflect changes
    } catch (error) {
      console.error('Error updating marks:', error);
    }
  };
  

  const handleChangeMark = (index, value) => {
    const newMarks = [...selectedMarks];
    console.log(newMarks)
    newMarks[index].marks = value;
    setSelectedMarks(newMarks);
  };

  const handleAddMarks = (studentId, subjectId) => {
    setSelectedStudentId(studentId)
  };

  return (
    <div className="container mt-5">
      <h2>Student Management</h2>
      <div className="mb-4">
        <h3>Students</h3>
        <ul className="list-group">
          {students.map((student) => (
            <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
              {student.username} - Enrollment Year: {student.enrollmentYear}{' '}
              <div>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedStudent({...student, clicked:"edit"});
                    fetchStudentMarks(student.id);
                  }}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit Marks
                </button>
                <button
                  onClick={() => {
                    setSelectedStudent({...student, clicked:"add"});
                    handleAddMarks(student.id)
                }}
                  className="btn btn-success btn-sm"
                >
                  Add Marks
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {(selectedStudent && selectedStudent.clicked==="edit") && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Edit Marks for {selectedStudent.username}</h3>
            {selectedMarks.map((mark, index) => (
              <div key={mark.id} className="mb-3">
                <label className="form-label">
                  Subject {subjects.find((subject) => subject.id === mark.subjectId )?.name || mark.subjectId}:
                  <input
                    type="number"
                    value={mark.marks}
                    onChange={(e) => handleChangeMark(index, e.target.value)}
                    className="form-control"
                  />
                </label>
              </div>
            ))}
            <button onClick={handleEditMarks} className="btn btn-success me-2">Save Changes</button>
            <button onClick={() => setSelectedStudent(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {selectedStudent && selectedStudent.clicked === "add" && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Add Marks for {selectedStudent.username}</h3>
            <div className="mb-3">
              <label className="form-label">Subject:</label>
              <select
                value={selectedMarks.subjectId}
                onChange={(e) => {
                  const newMarks = [...selectedMarks];
                  newMarks[e.target.value]={}
                  newMarks[e.target.value].studentId = selectedStudentId
                  newMarks[e.target.value].subjectId = e.target.value
                  newMarks[e.target.value].marks = null;
                  setSelectedSubject(e.target.value)
                  setSelectedMarks(newMarks)
                }
                }
                className="form-select"
              >
                <option value="">Select Subject</option>
                {subjects.filter(subject => {
      return subject.fieldId == selectedStudent.fieldId;
    }).map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Marks:</label>
              <input
                type="number"
                value={selectedMarks.marks}
                onChange={(e) => {
                  const newMarks = [...selectedMarks];
                  newMarks[selectedSubject].marks = e.target.value;
                  setSelectedMarks(newMarks)
                }
                }
                className="form-control"
              />
            </div>
            <button onClick={handleEditMarks} className="btn btn-success me-2">
              Add Marks
            </button>
            <button onClick={() => setSelectedStudent(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentManagement;
