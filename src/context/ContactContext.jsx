import React, { createContext, useContext, useState, useEffect } from 'react';

// Contact Context
const ContactContext = createContext();

// Contact Provider Component
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_BASE = 'https://playground.4geeks.com/contact';
  const AGENDA_SLUG = 'my-agenda';

  useEffect(() => {
    initializeAgenda();
  }, []);

  const initializeAgenda = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`);
      
      if (!response.ok) {
        response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      await fetchContacts();
    } catch (err) {
      setError('Failed to initialize contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      }
    } catch (err) {
      setError('Failed to fetch contacts');
    }
  };

  const createContact = async (contactData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        await fetchContacts();
        return true;
      }
      throw new Error('Failed to create contact');
    } catch (err) {
      setError('Failed to create contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        await fetchContacts();
        return true;
      }
      throw new Error('Failed to update contact');
    } catch (err) {
      setError('Failed to update contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchContacts();
        return true;
      }
      throw new Error('Failed to delete contact');
    } catch (err) {
      setError('Failed to delete contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getContactById = (id) => {
    return contacts.find(contact => contact.id === parseInt(id));
  };

  const value = {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    fetchContacts,
    getContactById
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook to use contact context
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};