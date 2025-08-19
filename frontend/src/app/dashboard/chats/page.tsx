"use client";

import Chat from "@/components/Chat/Chat";
import styles from "./page.module.scss";

export default function ChatsPage() {
    return (
        <main className={styles.chatsPage} aria-label="Página de conversas">
            <header>
                <h1>Suas conversas</h1>
            </header>

            <section className={styles.chats} aria-label="Lista de conversas">
                <Chat id={1} provider="kauã" text="asda" date="domingo - 9:00"/>
            </section>
        </main>
    );
}
