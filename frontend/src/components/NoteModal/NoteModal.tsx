// components/NoteModal/NoteModal.tsx
"use client"

import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./NoteModal.module.scss";

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {

  const options = [
    { value: "repairs", label: "Repairs and Maintenance" },
    { value: "cleaning", label: "Cleaning Services" },
    { value: "it", label: "IT and Tech Support" },
    { value: "tutoring", label: "Tutoring and Education" },
    { value: "beauty", label: "Beauty and Aesthetics" },
    { value: "events", label: "Events and Parties" },
    { value: "delivery", label: "Deliveries and Moving" },
    { value: "construction", label: "Construction and Renovation" },
    { value: "consulting", label: "Professional Consulting" },
    { value: "other", label: "Other" },
  ]

  return (
    <section className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Add a new note</h3>

        <div className={styles.inputs}>
          <Input required={true} type="textarea" label="Note Text" max_lenght={400} />
          <Input required={false} type="select" label="Category" placeholder="Select a Category" options={options} />
        </div>

        <div className={styles.buttons}>
          <Button text="Cancel" type="secondary" handleFunction={onClose} />
          <Button text="Save" type="primary" />
        </div>
      </div>
    </section>
  );
}
