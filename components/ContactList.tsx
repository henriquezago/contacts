import { Grid, Loading } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { getContacts } from "../actions";
import useFilteredContacts from "../hooks/useFilteredContacts";
import { Contact } from "../pages/api/contacts";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import NameFilter from "./NameFilter";

import styles from "../styles/ContactList.module.scss";

type ContactListProps = {
  contacts: Contact[];
  isLoading: boolean;
  getContacts: () => void;
}

function ContactList({ contacts, isLoading, getContacts }: ContactListProps) {
  const [selectedContact, setSelectedContact] = useState<Contact>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { filteredContacts, filter, setFilter } = useFilteredContacts(contacts);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const openModal = useCallback((contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);
  }, [setSelectedContact, setIsModalVisible]);

  const contactElements =
    filteredContacts
      .map((contact) =>
        <Grid xs={6} key={contact.id}>
          <ContactCard contact={contact}
            onClick={openModal} />
        </Grid>
      );

  if (isLoading) {
    return <Loading size="lg" />;
  }

  return (
    <div className={styles.wrapper}>
      <NameFilter filter={filter} onChange={newFilter => setFilter(newFilter)} />

      <Grid.Container gap={2} justify="center">
        {contactElements}
      </Grid.Container>

      <ContactModal contact={selectedContact}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contacts: state.contact.contacts,
    isLoading: state.contact.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContacts: () => dispatch(getContacts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
