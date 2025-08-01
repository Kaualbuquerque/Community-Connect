"use client"

import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./NoteModal.module.scss";

interface NoteModalProps {
  onClose: () => void;
  onConfirm: (text: string, category: string) => void;
}

export default function NoteModal({ onClose, onConfirm }: NoteModalProps) {
  // Estado para os inputs:
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const options = [
    { value: "Category", label: "Select a category", disabled: true },
    { value: "Repairs", label: "Repairs and Maintenance", disabled: false },
    { value: "Cleaning", label: "Cleaning Services", disabled: false },
    { value: "IT", label: "IT and Tech Support", disabled: false },
    { value: "Tutoring", label: "Tutoring and Education", disabled: false },
    { value: "Beauty", label: "Beauty and Aesthetics", disabled: false },
    { value: "Events", label: "Events and Parties", disabled: false },
    { value: "Deliveries", label: "Deliveries and Moving", disabled: false },
    { value: "Construction", label: "Construction and Renovation", disabled: false },
    { value: "Consulting", label: "Professional Consulting", disabled: false },
    { value: "Other", label: "Other", disabled: false },
  ];

  function handleSave() {
    if (!text.trim() || !category || category === "Category") return; // checagem básica
    onConfirm(text, category);
  }

  return (
    <section className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Add a new note</h3>

        <div className={styles.inputs}>
          <Input
            required
            type="textarea"
            label="Note"
            placeholder="What do you want to remember?"
            max_length={400}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Input
            required
            type="select"
            label="Category"
            placeholder="Select a Category"
            options={options}
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <Button text="Cancel" type="secondary" handleFunction={onClose} />
          <Button text="Save" type="primary" handleFunction={handleSave} />
        </div>
      </div>
    </section>
  );
}