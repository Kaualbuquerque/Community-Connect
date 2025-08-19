"use client";

import { useState } from "react";
import Message from "@/components/Message/Message";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./page.module.scss";
import { MessageProps } from "@/utils/props";

export default function ChatConversationPage() {
  const [messages, setMessages] = useState<MessageProps[]>([
    { type: "sender", text: "Olá, sou o sender!" },
    { type: "recipient", text: "Olá, sou o recipient!" },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [
      ...prev,
      { type: "sender", text: inputValue }
    ]);
    setInputValue("");
  };

  return (
    <main className={styles.chatConversationPage} aria-label="Conversa">
      <section className={styles.messages} aria-label="Mensagens da conversa">
        {messages.map((msg, idx) => (
          <Message key={idx} type={msg.type} text={msg.text} />
        ))}
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
