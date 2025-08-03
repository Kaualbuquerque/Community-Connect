"use client"

import RegisterForm from "@/components/RegisterForm/RegisterForm"
import styles from "./page.module.scss"

export default function RegisterPage() {


    return (
        <div className={styles.registerPage}>
                <RegisterForm />
        </div>
    )
}