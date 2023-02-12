import { Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Contact } from "../pages/api/contacts";

import ContactModalDetails from "./ContactModalDetails";
import ContactModalForm from "./ContactModalForm";

type ContactModalProps = {
  contact: Contact;
  isVisible: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
}

export default function ContactModal({ contact, onClose, isVisible, onSave }: ContactModalProps) {
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
    <ContactModalForm contact={contact} onSave={onSave} onCancel={cancelEditing} /> :
    <ContactModalDetails contact={contact} onEdit={startEditing} onDelete={() => null} />;

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
