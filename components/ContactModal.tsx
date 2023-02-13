import { Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Contact } from "../pages/api/contacts";

import ContactModalDetails from "./ContactModalDetails";
import ContactModalForm from "./ContactModalForm";

type ContactModalProps = {
  contact: Contact;
  isVisible: boolean;
  onClose: () => void;
  onDelete: (contactId: string) => void;
}

export default function ContactModal({ contact, onClose, isVisible, onDelete }: ContactModalProps) {
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  }

  const cancelEditing = () => {
    setIsEditing(false);
  }

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const closeHandler = () => {
    setIsEditing(false);
    setVisible(false);
    onClose();
  };

  const modalContent = isEditing ?
    <ContactModalForm contact={contact} onCancel={cancelEditing} /> :
    <ContactModalDetails contact={contact} onEdit={startEditing} onDelete={() => onDelete(contact.id)} />;

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
