// markService.js
import api from './api';

const markService = {
  getMarksByStudentId: async (studentId) => {
    return api.get(`/students/${studentId}`);
  },

  updateMark: async ( data) => {
    return api.post(`students/marks`, data);
  },

  addMark: async ( data) => {
    return api.post(`students/marks`, data);
  },
};

export default markService;
