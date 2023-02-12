import { useState } from "react";
import { Button, Image, Input, Text } from "@nextui-org/react";

import { Contact } from "../pages/api/contacts";

import styles from "../styles/ContactModal.module.scss";
import ImageSelect from "./ImageSelect";

type ContactModalDetailsProps = {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export default function ContactModalForm({ contact, onSave, onCancel }: ContactModalDetailsProps) {
  const [avatar, setAvatar] = useState(contact.avatar);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [birthday, setBirthday] = useState(contact.birthday);

  const saveHandler = () => {
    onSave({
      ...contact,
      avatar,
      name,
      email,
      phone,
      birthday,
    });
  }

  return (
    <>
      <ImageSelect url={avatar} onChange={newImage => setAvatar(newImage)} />

      <div className={styles.contactDetails}>
        <Input name="name" label="Name" value={name} onChange={event => setName(event.target.value)} />

        <Input label="Email" type="email" value={email} onChange={event => setEmail(event.target.value)} />

        <Input label="Phone" type="tel" value={phone} onChange={event => setPhone(event.target.value)} />

        <Input label="Birthday" value={birthday} type="date" onChange={event => setBirthday(event.target.value)} />
      </div>

      <Button auto flat color="error" onPress={onCancel}>
        Cancel
      </Button>
      <Button auto onPress={saveHandler}>
        Save
      </Button>
    </>
  );
}
