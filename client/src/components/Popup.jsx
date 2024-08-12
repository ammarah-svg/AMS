import React, { useState } from 'react';

const PopupForm = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    gender: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    show ? (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>X</button>
          <form onSubmit={handleSubmit}>
            <h2>Edit Your Profile</h2>
            <label>
              First Name:
              <input type="text" name="f_name" value={formData.f_name} onChange={handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="l_name" value={formData.l_name} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Department:
              <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default PopupForm;
