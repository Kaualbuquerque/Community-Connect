"use client"

import styles from "./page.module.scss"
import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext";
import FormInput from "@/components/FormInput/FormInput"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"

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
                            <FormInput label="Consumer" type="radio" name="userProfile" value="consumer" required={true}/>
                            <FormInput label="Provider" type="radio" name="userProfile" value="provider" required={true}/>
                        </div>
                    </div>
                    <FormInput label="Full name:" type="text" placeholder="Your full name" required={true}/>
                    <FormInput label="Email:" type="email" placeholder="You@example.com" required={true}/>
                    <FormInput label="Password:" type="Password" placeholder="Your password" required={true} min_lenght={6} max_lenght={12}/>
                    <FormInput label="Confirm password:" type="Password" placeholder="Confirm password" required={true} min_lenght={6} max_lenght={12}/>
                    <FormInput label="Phone:" type="phone" placeholder="(xx) xxxxx-xxxx" required={true} min_lenght={11} max_lenght={11}/>
                    <FormInput label="Location:" type="text" placeholder="Your location" required={true}/>
                    <div className={styles.buttons}>
                        <Button text="Sign up" type="primary" />
                        <p>Already have an account?</p>
                    </div>
                </Form>
            </section>

        </div>
    )
}