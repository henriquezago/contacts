import { useEffect, useState } from "react";
import { Contact } from "../pages/api/contacts";

function useFilteredContacts (contacts: Contact[]) {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [contacts, filter]);

  return { filteredContacts, filter, setFilter };
};

export default useFilteredContacts;
