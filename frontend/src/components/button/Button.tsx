import Link from "next/link";
import styles from "./Button.module.scss"

interface ButtonProps {
    text: string,
    type: string,
    href?: string;
}

export default function Button({ text, type, href }: ButtonProps) {
    const button = (
        <button className={`${styles.button} ${styles[type]}`}>
            {text}
        </button>
    );

    return href ? <Link href={href}>{button}</Link> : button;
}