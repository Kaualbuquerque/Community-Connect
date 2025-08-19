import Link from "next/link";

import styles from "./Chat.module.scss";
import { ChatProps } from "@/utils/props";

export default function Chat({ id, provider, text, date }: ChatProps) {
  return (
    <article className={styles.chat}>
      <Link href={`/dashboard/chats/${id}`} aria-label={`Abrir chat com ${provider}`}>
        <h3 className={styles.provider}>{provider}</h3>
        <p className={styles.message}>{text}</p>
        <time dateTime={date} className={styles.date}>
          {date}
        </time>
      </Link>
    </article>
  );
}

