import { Contact } from "../pages/api/contacts";

import { Card, Col, Text } from "@nextui-org/react";

type ContactCardProps = {
  contact: Contact;
  onClick: (contact: Contact) => void;
}

export default function ContactCard({ contact, onClick }: ContactCardProps) {
  return (
    <Card isPressable={true} onClick={() => onClick(contact)}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text h4 color="white">
            {contact.name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Card.Image
          src={contact.avatar}
          objectFit="contain"
          width={240}
          height="100%"
          alt={`${contact.name}'s avatar image`}
        />
      </Card.Body>
    </Card>
  );
}
