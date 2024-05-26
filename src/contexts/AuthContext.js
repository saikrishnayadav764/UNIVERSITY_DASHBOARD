// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import subjectService from '../services/subjectService';
import fieldService from '../services/fieldService'; 
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [currfields, setcurrFields] = useState([]); 
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await subjectService.getSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    const fetchFields = async () => { 
      try {
        const response = await fieldService.getFields();
        setcurrFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchCurrentUser();
    fetchSubjects();
    fetchFields(); 
  }, [token]);

  const loginAdmin = async (username, password) => {
    try {
      await authService.loginAdmin(username, password);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const loginStudent = async (username, password) => {
    try {
      await authService.loginStudent(username, password);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    setSubjects,
    loginAdmin,
    loginStudent,
    setCurrentUser,
    logout,
    subjects,
    currfields,
    setcurrFields 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
