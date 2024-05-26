// subjectService.js
import api from './api';

const subjectService = {
  getSubjects: async () => {
    return api.get('/subjects');
  },

  getSubjectById: async (id) => {
    return api.get(`/subjects/${id}`);
  },

  createSubject: async (name, fieldId) => {
    return api.post('/subjects', { name, fieldId });
  },

  updateSubject: async (id, name, fieldId) => {
    return api.put(`/subjects/${id}`, { name, fieldId });
  },

  deleteSubject: async (id) => {
    return api.delete(`/subjects/${id}`);
  },
};

export default subjectService;
