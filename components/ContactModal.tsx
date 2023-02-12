import { useEffect, useState } from "react";
import { Button, Image, Modal, Text } from "@nextui-org/react";
import { Contact } from "../pages/api/contacts";

import ContactModalDetails from "./ContactModalDetails";

type ContactModalProps = {
  contact: Contact;
  isVisible: boolean;
  onClose: () => void;
}

export default function ContactModal({ contact, onClose, isVisible }: ContactModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const closeHandler = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal closeButton
           aria-labelledby="modal-title"
           open={visible}
           onClose={closeHandler}>
      <Modal.Body>
        <ContactModalDetails contact={contact} />
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Delete
        </Button>
        <Button auto onPress={closeHandler}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
