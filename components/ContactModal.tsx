import { Modal } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Contact } from "../pages/api/contacts";

import ContactModalDetails from "./ContactModalDetails";
import ContactModalForm from "./ContactModalForm";
import { connect } from "react-redux";
import { deleteContact } from "../actions";

type ContactModalProps = {
  contact: Contact;
  isVisible: boolean;
  onClose: () => void;
  onDelete: (contactId: string) => void;
}

function ContactModal({ contact, onClose, isVisible, onDelete }: ContactModalProps) {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const cancelEditing = () => {
    setIsEditing(false);
  }

  const closeHandler = useCallback(() => {
    setIsEditing(false);
    setVisible(false);
    onClose();
  }, [setIsEditing, setVisible, onClose]);

  const deleteContact = useCallback(() => {
    onDelete(contact.id);
    closeHandler();
  }, [onDelete, closeHandler]);

  const modalContent = isEditing ?
    <ContactModalForm contact={contact} onCancel={cancelEditing} onClose={onClose} /> :
    <ContactModalDetails contact={contact} onEdit={startEditing} onDelete={deleteContact} />;

  return (
    <Modal closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}>
      <Modal.Body>
        {modalContent}
      </Modal.Body>
    </Modal>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: (contactId) => dispatch(deleteContact(contactId))
  }
}

export default connect(null, mapDispatchToProps)(ContactModal);
