"use client"

import styles from "./Header.module.scss"

import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"

import Button from "../Button/Button"
import Image from "next/image"
import ThemeButton from "../themeButton/ThemeButton"
import { useTheme } from "@/context/ThemeContext"
import { usePathname } from "next/navigation"

export default function Header() {
    const { theme } = useTheme()
    const pathname = usePathname()

    const isHome = pathname === "/"

    return (
        <section className={styles.header}>
            <div className={styles.title}>
                {theme === "light" ? (
                    <Image src={logo_dark} alt="Logo modo claro" />
                ) : (
                    <Image src={logo} alt="Community Connect logo" />
                )}
                <h1>Community Connect</h1>
            </div>

            <div className={styles.buttons}>
                {isHome && (
                    <div>
                        <Button text="Log In" type="primary" href="/auth/login" />
                        <Button text="Sign Up" type="secondary" href="/auth/register" />
                    </div>
                )}

                {/* Sempre visível, independente da rota */}
                <ThemeButton />
            </div>
        </section>
    )
}
