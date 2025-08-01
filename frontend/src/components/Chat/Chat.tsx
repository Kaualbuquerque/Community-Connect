import Link from "next/link"
import styles from "./Chat.module.scss"

interface ChatProps {
    id: string | number
}

export default function Chat({ id }: ChatProps) {
    return (
        <div className={styles.chat}>
            <Link href={`/dashboard/chats/${id}`}>
                <h4>Carla Mendes</h4>
                <p>
                    Hi, Ana! How are you? Thank you very much for contacting me. Yes, I am available
                    on Friday morning or early afternoon. What time would be best for you?
                </p>
                <span>09:04</span>
            </Link>
        </div>
    )
}
