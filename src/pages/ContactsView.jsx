import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';
import { useContacts } from '../context/ContactContext';

const ContactsView = () => {
  const { contacts, loading, error } = useContacts();
  const navigate = useNavigate();

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container-xl">
        {/* Header with Add Button */}
        <div className="d-flex justify-content-end mb-4">
          <button
            onClick={handleAddContact}
            className="btn btn-success px-4"
          >
            Add new contact
          </button>
        </div>

        {/* Contact List */}
        <div className="card border">
          {contacts.length === 0 ? (
            <div className="card-body text-center py-5">
              <h3 className="h5 text-dark mb-3">No contacts yet</h3>
              <p className="text-muted mb-4">Get started by adding your first contact.</p>
              <button
                onClick={handleAddContact}
                className="btn btn-success"
              >
                Add Your First Contact
              </button>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {contacts.map((contact) => (
                <div key={contact.id} className="list-group-item p-0 border-0">
                  <ContactCard contact={contact} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsView;