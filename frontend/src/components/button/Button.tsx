import styles from "./Button.module.scss"

interface ButtonProps {
    text: string,
    type: string,
}

export default function Button({ text, type }: ButtonProps) {
    return (
        <button className={`${styles.button} ${styles[type]}`}>
            {text}
        </button>
    )
}