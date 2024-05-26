// studentService.js
import api from './api';

const studentService = {
  getStudents: async () => {
    return api.get('/students');
  },

  getStudentById: async (id) => {
    return api.get(`/students/${id}`);
  },

  updateStudent: async (id, data) => {
    return api.put(`/students/${id}`, data);
  },

  deleteStudent: async (id) => {
    return api.delete(`/students/${id}`);
  },

  addOrUpdateMark: async (data) => {
    return api.post('/students/marks', data);
  },
};

export default studentService;
