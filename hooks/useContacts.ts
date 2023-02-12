import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import { Contact } from "../pages/api/contacts";

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response: AxiosResponse<Contact[]> = await axios.get('/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async (contact: Contact) => {
    try {
      const response: AxiosResponse<Contact> = await axios.post('/api/contacts', contact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (updatedContact: Contact) => {
    const id = updatedContact.id;
    try {
      const response: AxiosResponse<Contact> = await axios.put(`/api/contacts?id=${id}`, updatedContact);
      const updatedContacts = contacts.map((contact) => (contact.id === id ? response.data : contact));
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts?id=${id}`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };
};

export default useContacts;
