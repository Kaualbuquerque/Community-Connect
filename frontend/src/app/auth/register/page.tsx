"use client"

import styles from "./page.module.scss"
import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext";
import Input from "@/components/Input/Input"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Link from "next/link"

export default function Register() {
    const { theme } = useTheme();

    return (
        <div className={styles.signup_page}>
            <section className={styles.signup_form}>
                <Form>
                    <div className={styles.logo}>
                        {theme === "light" ?
                            <Image src={logo_dark} alt="Logo modo claro" />
                            :
                            <Image src={logo} alt="communit connect logo" />
                        }
                        <h3>Communit Connect</h3>
                    </div>
                    <h2>Sign up</h2>
                    <div className={styles.profile}>
                        <p>Choose your profile:</p>
                        <div>
                            <Input label="Consumer" type="radio" name="userProfile" value="consumer" required={true} />
                            <Input label="Provider" type="radio" name="userProfile" value="provider" required={true} />
                        </div>
                    </div>
                    <Input label="Full name:" type="text" placeholder="Your full name" required={true} />
                    <Input label="Email:" type="email" placeholder="You@example.com" required={true} />
                    <Input label="Password:" type="Password" placeholder="Your password" required={true} min_lenght={6} max_lenght={12} />
                    <Input label="Confirm password:" type="Password" placeholder="Confirm password" required={true} min_lenght={6} max_lenght={12} />
                    <Input label="Phone:" type="phone" placeholder="(xx) xxxxx-xxxx" required={true} min_lenght={11} max_lenght={11} />
                    <Input label="Location:" type="text" placeholder="Your location" required={true} />
                    <div className={styles.buttons}>
                        <Button text="Sign up" type="primary" href="/auth/login" />
                        <Link href="/auth/login"><p>Already have an account?</p></Link>
                    </div>
                </Form>
            </section>

        </div>
    )
}