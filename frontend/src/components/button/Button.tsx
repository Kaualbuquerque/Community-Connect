import Link from "next/link";
import styles from "./Button.module.scss"

interface ButtonProps {
    text: string,
    type: string,
    href?: string;
    handleFunction?: any;
}

export default function Button({ text, type, href, handleFunction }: ButtonProps) {
    const button = (
        <button className={`${styles.button} ${styles[type]}`} onClick={handleFunction}>
            {text}
        </button>
    );

    return href ? <Link href={href} className={styles.link}>{button}</Link> : button;
}