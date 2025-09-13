"use client";

import Chat from "@/components/Chat/Chat";
import styles from "./page.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Conversation } from "@/utils/interfaces";
import { getConversations } from "@/services/conversation";

export default function ChatsPage() {

    const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    const formatName = (fullName: string) => {
        const parts = fullName.split(" ");
        return parts.slice(0, 3).join(" ");
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setLoggedUserId(user.id);
            } catch (error) {
                console.error("Erro ao ler usuário do localStorage:", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!loggedUserId) return;

            try {
                setLoading(true);
                const data = await getConversations(loggedUserId);
                setConversations(data);
                console.log(data);
            } catch (error) {
                console.error("Erro ao carregar as conversas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [loggedUserId]);

    return (
        <main className={styles.chatsPage} aria-label="Página de conversas">
            <header>
                <h1>Suas conversas</h1>
            </header>

            <section className={styles.chats} aria-label="Lista de conversas">
                {conversations.map((conversation) => (
                    <Chat
                        key={conversation.id}
                        id={conversation.id}
                        provider={formatName(conversation.participants[0].user.name)}
                        date={formatDate(conversation.updatedAt)}
                    />
                ))}
            </section>
        </main>
    );
}
