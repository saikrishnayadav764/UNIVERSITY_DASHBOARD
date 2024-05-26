// fieldService.js
import api from './api';

const fieldService = {
  getFields: async () => {
    return api.get('/fields');
  },

  getFieldById: async (id) => {
    return api.get(`/fields/${id}`);
  },

  createField: async (name) => {
    return api.post('/fields', { name });
  },

  updateField: async (id, name) => {
    return api.put(`/fields/${id}`, { name });
  },

  deleteField: async (id) => {
    return api.delete(`/fields/${id}`);
  },
};

export default fieldService;
