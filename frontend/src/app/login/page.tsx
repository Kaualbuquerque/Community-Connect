"use client"

import styles from "./page.module.scss"
import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext";
import FormInput from "@/components/FormInput/FormInput"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"

export default function Login() {
    const { theme } = useTheme();

    return (
        <div className={styles.login_page}>
                <section className={styles.login_form}>
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
                        <FormInput label="Email:" type="email" placeholder="you@example.com" required={true}/>
                        <FormInput label="Password:" type="Password" placeholder="your password" required={true} min_lenght={6} max_lenght={12}/>
                        <div className={styles.buttons}>
                            <Button text="Login" type="primary" />
                            <p>or</p>
                            <Button text="Log in with Google" type="other" />
                        </div>
                    </Form>
                </section>

        </div>
    )
}