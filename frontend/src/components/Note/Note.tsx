import styles from "./Note.module.scss"

interface NoteProps {
    text: string;
    category: string;
    date: string;
    onDelete: () => void;
}


export default function Note({ text, category, date, onDelete }: NoteProps) {
    return (
        <div className={styles.note}>
            <div className={styles.text}>
                <p>{text}</p>
                <span>{category}</span>
                <span>{date}</span>
            </div>
            <div className={styles.actions}>
                <p onClick={onDelete}>Delete</p>
            </div>
        </div>
    )
}