import { Button, Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { updateContact } from "../actions";
import { Contact } from "../pages/api/contacts";
import ImageSelect from "./ImageSelect";

import styles from "../styles/ContactModal.module.scss";

type ContactModalDetailsProps = {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
  onClose: () => void;
}

type FormInputs = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
};

function ContactModalForm({ contact, onSave, onClose, onCancel }: ContactModalDetailsProps) {
  const [avatar, setAvatar] = useState(contact.avatar);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      birthday: contact.birthday,
    }
  });

  const onSubmit = useCallback((formData: FormInputs) => {
    onSave({
      ...contact,
      avatar,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthday: formData.birthday,
    });
    onClose();
  }, [avatar, contact, onSave]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ImageSelect url={avatar} onChange={newImage => setAvatar(newImage)} />

      <div className={styles.contactDetails}>
        <Input
          name="name"
          label="Name"
          fullWidth
          helperText={errors.name?.type === "required" && "Name is required"}
          status={errors.name && "error" || "default"}
          {...register("name", { required: true, maxLength: 80 })}
        />

        <Input
          label="Email"
          type="email"
          fullWidth
          helperText={errors.email?.type === "required" && "Email is required"}
          status={errors.email && "error" || "default"}
          {...register("email", { required: true, maxLength: 80 })}
        />

        <Input
          label="Phone"
          type="tel"
          fullWidth
          helperText={errors.phone?.type === "required" && "Phone is required"}
          status={errors.phone && "error" || "default"}
          {...register("phone", { required: true })}
        />

        <Input
          label="Birthday"
          type="date"
          fullWidth
          helperText={errors.email?.type === "required" && "Birthday is required"}
          status={errors.birthday && "error" || "default"}
          {...register("birthday", { required: true })}
        />
      </div>

      <div className={styles.formButtons}>
        <Button auto flat color="error" onPress={onCancel}>
          Cancel
        </Button>
        <Button auto type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSave: contact => dispatch(updateContact(contact)),
  }
}

export default connect(null, mapDispatchToProps)(ContactModalForm);
