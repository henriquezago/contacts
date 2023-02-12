import { useCallback, useState } from "react";
import { Grid } from "@nextui-org/react";

import { Contact } from "../pages/api/contacts";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import useFilteredContacts from "../hooks/useFilteredContacts";
import NameFilter from "./NameFilter";

import styles from "../styles/ContactList.module.scss";

type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  const [selectedContact, setSelectedContact] = useState<Contact>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { filteredContacts, filter, setFilter } = useFilteredContacts(contacts);

  const openModal = useCallback((contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  }, [setSelectedContact, setIsModalVisible]);

  const saveContact = useCallback((contact) => {
    onEdit(contact);
    setIsModalVisible(false);
  }, [onEdit]);

  const deleteContact = useCallback((contactId) => {
    onDelete(contactId);
    setIsModalVisible(false);
  }, [onDelete, setIsModalVisible]);

  const contactElements =
    filteredContacts
      .map((contact) =>
        <Grid xs={6} key={contact.id}>
          <ContactCard contact={contact}
            onClick={openModal} />
        </Grid>
      );

  return (
    <div className={styles.wrapper}>
      <NameFilter filter={filter} onChange={newFilter => setFilter(newFilter)} />
      <Grid.Container gap={2} justify="center">
        {contactElements}
      </Grid.Container>
      <ContactModal contact={selectedContact}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={deleteContact}
        onSave={saveContact} />
    </div>
  );
}
