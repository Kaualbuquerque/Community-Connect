"use client"

import Message from "@/components/Message/Message"
import styles from "./page.module.scss"
import Input from "@/components/Input/Input"
import { useState } from "react";
import Button from "@/components/Button/Button";

interface MessageProps {
  text: string;
  type: "sender" | "recipient";
}

export default function ChatConversationPage() {
  const [messages, setMessages] = useState<MessageProps[]>([
    { type: "sender", text: "Olá, sou o sender!" },
    { type: "recipient", text: "Olá, sou o recipient!" },
  ]);
  const [inputValue, setInputValue] = useState("");

  function handleSendMessage() {
    if (!inputValue.trim()) return;
    setMessages(prev => [
      ...prev,
      { type: "sender", text: inputValue }
    ]);
    setInputValue("");
  }

  return (
    <section className={styles.chatConversationPage}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <Message key={idx} type={msg.type} text={msg.text} />
        ))}
      </div>

      <div className={styles.inputText}>
        <Input type="textarea" placeholder="Digite sua mensagem..." value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <Button text="Enviar" type="primary" handleFunction={handleSendMessage} />
      </div>
    </section>
  )
}
