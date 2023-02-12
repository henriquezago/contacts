import { Contact } from "../pages/api/contacts";
import ContactCard from "./ContactCard";

import styles from "../styles/ContactList.module.scss";

type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

export default function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  const contactElements = contacts
    .map((contact) =>
      <ContactCard key={contact.id}
                   contact={contact}
                   onEdit={onEdit}
                   onDelete={onDelete} />
    );

  return <ul className={styles.list}>
    {contactElements}
  </ul>;
}
