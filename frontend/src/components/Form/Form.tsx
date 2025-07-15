import styles from "./Form.module.scss"
import React from "react";

interface FormProps {
    children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
    return (
        <form action="" className={styles.form}>
            {children}
        </form>
    )
}