"use client";

import { useCallback, useEffect, useState } from "react";
import Message from "@/components/Message/Message";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./page.module.scss";
import { Messages } from "@/utils/interfaces";
import { getMessages } from "@/services/conversation";
import { useParams } from "next/navigation";

export default function ChatConversationPage() {
  // Recupera o user do localStorage
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

  // Recupera o id da conversa
  const { id } = useParams(); // vem como string
  const conversationId = Number(id);

  const [conversation, setConversation] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      setConversation(data);
    } catch (error) {
      console.error("Erro ao carregar as conversas:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    setLoggedUserId(user.id);

    if (conversationId) {
      // Passa o userId direto para o fetch
      fetchConversations();
    }
  }, [conversationId]);


  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setInputValue("");
  };

  return (
    <main className={styles.chatConversationPage} aria-label="Conversa">
      <section className={styles.messages} aria-label="Mensagens da conversa">
        {
          conversation.map((message) => (
            <Message
              key={message.id}
              text={message.content}
              type={message.senderId === loggedUserId ? "sender" : "recipient"}
            />
          ))
        }
      </section>

      <form
        className={styles.inputText}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Input
          type="textarea"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          required
        />
        <Button text="Enviar" type="primary" handleFunction={handleSendMessage} />
      </form>
    </main>
  );
}
