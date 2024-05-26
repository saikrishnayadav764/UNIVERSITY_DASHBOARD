import api from './api';
import Cookies from 'js-cookie';

const authService = {
  loginAdmin: async (username, password) => {
    const response = await api.post('/auth/admin/login', { username, password });
    const { token,role } = response.data;
    Cookies.set('token', token); // Setting token in cookies
    Cookies.set('role', role);
    return response;
  },

  loginStudent: async (username, password) => {
    const response = await api.post('/auth/student/login', { username, password });
    const { token,role } = response.data;
    Cookies.set('token', token); // Setting token in cookies
    Cookies.set('role', role);
    return response;
  },

  signupStudent: async (username, password, enrollmentYear, fieldId) => {
    const response = await api.post('/auth/student/signup', { username, password, enrollmentYear, fieldId });
    return response;
  },

  getCurrentUser: async () => {
    return api.get('/auth/current-user');
  },

  logout: async () => {
    Cookies.remove('token'); // Removing token from cookies on logout
    return api.post('/auth/logout');
  },
};

export default authService;
