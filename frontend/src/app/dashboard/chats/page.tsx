import Chat from "@/components/Chat/Chat"
import styles from "./page.module.scss"

export default function ChatsPage() {
    return (
        <section className={styles.chatsPage}>
            <h2>Here are your conversations</h2>

            <div className={styles.chats}>
                <Chat id={1} />
            </div>
        </section>
    )
}