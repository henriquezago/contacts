import { useCallback, useState } from "react";
import { Grid } from "@nextui-org/react";

import { Contact } from "../pages/api/contacts";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";

type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  const [selectedContact, setSelectedContact] = useState(null as Contact);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = useCallback(contact => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  }, [setSelectedContact, setIsModalVisible]);

  const contactElements = contacts
    .map((contact) =>
      <Grid xs={2} key={contact.id}>
        <ContactCard contact={contact}
                     onClick={openModal} />
      </Grid>
    );

  return (
    <>
      <Grid.Container gap={2} justify="center">
        {contactElements}
      </Grid.Container>
      <ContactModal contact={selectedContact}
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)} />
    </>
  );
}
