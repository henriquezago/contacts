import { Image, Text } from "@nextui-org/react";
import { Contact } from "../pages/api/contacts";

import styles from "../styles/ContactModal.module.scss";

type ContactModalDetailsProps = {
  contact: Contact;
}

export default function ContactModalDetails({ contact }: ContactModalDetailsProps) {
  return (
    <>
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
    </>
  );
}
