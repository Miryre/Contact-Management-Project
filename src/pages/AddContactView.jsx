import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';

const AddContactView = () => {
  const { createContact, updateContact, loading, getContactById } = useContacts();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (isEditing) {
      const contact = getContactById(id);
      if (contact) {
        setFormData({
          name: contact.name || '',
          email: contact.email || '',
          phone: contact.phone || '',
          address: contact.address || ''
        });
      }
    }
  }, [id, isEditing, getContactById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    let success;
    if (isEditing) {
      success = await updateContact(id, formData);
    } else {
      success = await createContact(formData);
    }

    if (success) {
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-vh-100 bg-white py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Title */}
            <h1 className="text-center mb-5 fw-normal display-6">
              {isEditing ? 'Edit contact' : 'Add a new contact'}
            </h1>

            {/* Form */}
            <div className="mb-4">
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="form-control bg-light"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="form-control bg-light"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  className="form-control bg-light"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="form-control bg-light"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary w-100 py-3 mb-3"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Saving...
                  </>
                ) : (
                  'save'
                )}
              </button>

              {/* Back Link */}
              <div className="text-center">
                <button
                  onClick={handleBack}
                  className="btn btn-link text-decoration-underline p-0"
                >
                  or get back to contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactView;