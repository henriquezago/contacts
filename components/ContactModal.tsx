import { useEffect, useState } from "react";
import { Button, Image, Modal, Text } from "@nextui-org/react";
import { Contact } from "../pages/api/contacts";

import styles from "../styles/ContactModal.module.scss";

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
        <Image src={contact.avatar}
               alt={`${contact.name}'s avatar image`}
               objectFit="contain"
               width={240}
               height="100%" />

        <Text b size={18} className={styles.title}>
          {contact.name}
        </Text>
        <div className={styles.contactDetails}>
          <Text size={14}>
            <Text b>Phone:</Text> {contact.phone}
          </Text>
          <Text size={14}>
            <Text b>Email:</Text> {contact.email}
          </Text>
          <Text size={14}>
            <Text b>Birthday:</Text> {contact.birthday}
          </Text>
          <Text size={14}>
            <Text b>Created at:</Text> {new Date(contact.createdAt).toDateString()}
          </Text>
        </div>
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
