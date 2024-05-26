import React, { useState, useEffect } from 'react';
import fieldService from '../../services/fieldService';
import { useAuth } from '../../contexts/AuthContext';



const FieldManagement = () => {
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const { setcurrFields } = useAuth();

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await fieldService.getFields();
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const handleCreateField = async () => {
    try {
      const response = await fieldService.createField(newFieldName);
      setFields([...fields, response.data]);
      setcurrFields([...fields, response.data])
      setNewFieldName('');
    } catch (error) {
      console.error('Error creating field:', error);
    }
  };

  const handleDeleteField = async (id) => {
    try {
      await fieldService.deleteField(id);
      setFields(fields.filter((field) => field.id !== id));
      setcurrFields(fields.filter((field) => field.id !== id))
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Field Management</h2>
      <div className="mb-3">
        <h3>Add New Field</h3>
        <div className="input-group">
          <input
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            className="form-control"
            placeholder="Enter field name"
          />
          <button onClick={handleCreateField} className="btn btn-primary">Create</button>
        </div>
      </div>
      <div>
        <h3>Fields</h3>
        <ul className="list-group">
          {fields.map((field) => (
            <li key={field.id} className="list-group-item d-flex justify-content-between align-items-center">
              {field.name}  ({field.id})
              <button onClick={() => handleDeleteField(field.id)} className="btn btn-danger">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FieldManagement;
