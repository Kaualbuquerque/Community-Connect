"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import NoteModal from "@/components/NoteModal/NoteModal";
import styles from "./page.module.scss";
import { deleteNote, getNotes } from "@/services/note";
import { Notes } from "@/utils/props";
import Note from "@/components/Note/Note";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotes();

      const formatted = data.map((note: any) => ({
        ...note,
        date: note.createdAt,
      }));

      setNotes(formatted);
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((s) => s.id !== id));
      alert("Nota deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      alert("Não foi possível deletar o nota.");
    }
  };

  const handleCloseModal = (shouldReload?: boolean) => {
    setShowModal(false);
    if (shouldReload) fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <main className={styles.dashboardPage} aria-label="Painel do usuário">

      <header>
        <h1>Bem-vindo, Usuário</h1>
      </header>

      {/* Histórico de serviços */}
      <section className={styles.history} aria-labelledby="history-title">
        <h2 id="history-title">Histórico de serviço</h2>
        <div className={styles.serviceHistory}>
          {/* Aqui você pode mapear ServiceBanner ou outro componente */}
        </div>
      </section>

      {/* Notas pessoais */}
      <section className={styles.personalNotes} aria-labelledby="notes-title">
        <h2 id="notes-title">Notas pessoais</h2>



        <div className={styles.notes}>
          {loading && <p>Carregando serviços...</p>}

          {!loading && notes.length === 0 && (
            <p>Você ainda não criou nenhuma nota</p>
          )}

          {!loading &&
            notes.map((note) => (
              <Note content={note.content} date={note.date} onDelete={() => handleDeleteNote(note.id)} key={note.id} />
            ))}
        </div>

        <div className={styles.addNote}>
          <Button
            text="+ Adicionar nota"
            type="secondary"
            handleFunction={() => setShowModal(true)}
          />
        </div>

      </section>

      {showModal && (
        <NoteModal
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
