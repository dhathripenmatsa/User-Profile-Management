import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useUsers } from '../context/UserContext';

const AddUserModal = ({ onClose }) => {
  const { addUser } = useUsers();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.contact && !/^\+?\d{10,15}$/.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = 'Contact number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const [firstName, ...lastNameParts] = formData.name.trim().split(' ');
      const lastName = lastNameParts.join(' ');
      
      addUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        contact: formData.contact.trim(),
        firstName: firstName,
        lastName: lastName,
        phone: formData.contact.replace(/\D/g, ''),
        yearOfBirth: '',
        gender: '',
        alternatePhone: '',
        address: '',
        pincode: '',
        domicileState: '',
        domicileCountry: '',
        skills: '',
        projects: ''
      });
      
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add User</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name of the user</label>
            <input
              type="text"
              id="name"
              name="name"
              className={errors.name ? 'error' : ''}
              placeholder="Type here"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                className={errors.email ? 'error' : ''}
                placeholder="Type here"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                name="contact"
                className={errors.contact ? 'error' : ''}
                placeholder="Type here"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <span className="error-text">{errors.contact}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
