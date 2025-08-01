"use client"

import styles from "./page.module.scss"
import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext";
import Input from "@/components/Input/Input"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"

export default function LoginPage() {
    const { theme } = useTheme();

    return (
        <div className={styles.loginPage}>
            <section className={styles.loginForm}>
                <Form>
                    <div className={styles.logo}>
                        {theme === "light" ?
                            <Image src={logo_dark} alt="Logo modo claro" />
                            :
                            <Image src={logo} alt="communit connect logo" />
                        }
                        <h3>Communit Connect</h3>
                    </div>
                    <h2>Login</h2>
                    <Input label="Email:" type="email" placeholder="Seu@email.com" required={true} />
                    <Input label="Senha:" type="Password" placeholder="Sua senha" required={true} min_length={6} max_length={12} />
                    <div className={styles.buttons}>
                        <Button text="Login" type="primary" href="/dashboard" />
                    </div>
                </Form>
            </section>

        </div>
    )
}