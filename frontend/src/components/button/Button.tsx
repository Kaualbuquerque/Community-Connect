import Link from "next/link";
import styles from "./Button.module.scss"
import Image from "next/image";

interface ButtonProps {
    text: string,
    type: string,
    href?: string;
    handleFunction?: () => void;
    icon?: any;
    disabled?: boolean;
}

export default function Button({ text, type, href, handleFunction, icon, disabled }: ButtonProps) {
    const button = (
        <button className={`${styles.button} ${styles[type]}`} onClick={handleFunction} disabled={disabled}>
            {text}
            {icon && <Image src={icon} alt="" />}
        </button>
    );

    return href ? <Link href={href} className={styles.link}>{button}</Link> : button;
}