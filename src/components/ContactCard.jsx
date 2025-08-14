import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useContacts } from '../context/ContactContext';

const ContactCard = ({ contact }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteContact } = useContacts();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteContact(contact.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    navigate(`/edit-contact/${contact.id}`);
  };

  // Create a placeholder avatar with initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="card-body d-flex align-items-center justify-content-between py-3">
        {/* Left side - Avatar and Contact Info */}
        <div className="d-flex align-items-center">
          {/* Avatar */}
          <div 
            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold me-3"
            style={{ width: '64px', height: '64px', fontSize: '18px' }}
          >
            {getInitials(contact.name)}
          </div>
          
          {/* Contact Information */}
          <div>
            <h5 className="mb-1 text-dark">{contact.name}</h5>
            <div className="text-muted small mb-1">
              📍 {contact.address}
            </div>
            <div className="text-muted small mb-1">
              📞 {contact.phone}
            </div>
            <div className="text-muted small">
              ✉️ {contact.email}
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="d-flex gap-2">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary btn-sm"
            title="Edit contact"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-outline-danger btn-sm"
            title="Delete contact"
          >
            🗑️
          </button>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contact.name}? This action cannot be undone.`}
      />
    </>
  );
};

export default ContactCard;