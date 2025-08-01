"use client"

import { useState } from "react"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import Button from "@/components/Button/Button"
import Note from "@/components/Note/Note"
import NoteModal from "@/components/NoteModal/NoteModal"
import styles from "./page.module.scss"

interface Note {
  id: number; // novo campo
  text: string;
  category: string;
  date: string;
}

const tempServices = [
  {
    id: 1,
    name: "Limpeza da casa",
    provider: "Maria Souza",
    description: "Serviços profissionais de limpeza residencial.",
    location: "São Paulo, SP",
    date: "Today, 10:00 AM",
    category: "limpeza",
    images: [],
  },
  {
    id: 2,
    name: "Limpeza da casa",
    provider: "Maria Souza",
    description: "Serviços profissionais de limpeza residencial.",
    location: "São Paulo, SP",
    date: "Today, 10:00 AM",
    category: "limpeza",
    images: [],
  },
  {
    id: 3,
    name: "Limpeza da casa",
    provider: "Maria Souza",
    description: "Serviços profissionais de limpeza residencial.",
    location: "São Paulo, SP",
    date: "Today, 10:00 AM",
    category: "limpeza",
    images: [],
  }
]

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  // aqui dividimos em grupos de 3
  const chunkedServices: typeof tempServices[] = [];
  for (let i = 0; i < tempServices.length; i += 3) {
    chunkedServices.push(tempServices.slice(i, i + 3));
  }

  const handleConfirmNote = (text: string, category: string) => {
    const now = new Date();
    const date =
      now.getDate().toString().padStart(2, "0") + "/" +
      (now.getMonth() + 1).toString().padStart(2, "0") + "/" +
      now.getFullYear();

    setNotes(prev => [
      ...prev,
      { id: Date.now(), text, category, date }
    ]);
    setShowModal(false);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return (
    <section className={styles.dashboardPage}>
      <h2>Bem-vindo, Usuário</h2>

      <section className={styles.history}>
        <h3>Histórico de serviço</h3>
        <div className={styles.serviceHistory}>
          {tempServices.map((service) => (
            <ServiceBanner key={service.id} role="consumer" service={service} />
          ))}
        </div>
      </section>

      <section className={styles.personalNotes}>
        <h3>Notas pessoais</h3>
        <div>
          <Button text="+ Adicionar nota" type="secondary" handleFunction={() => setShowModal(true)} />
        </div>
        <div className={styles.notes}>
          {notes.map((note) => (
            <Note
              key={note.id}
              text={note.text}
              category={note.category}
              date={note.date}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </section>

      {showModal && <NoteModal onClose={() => setShowModal(false)} onConfirm={handleConfirmNote} />}
    </section>
  )
}
