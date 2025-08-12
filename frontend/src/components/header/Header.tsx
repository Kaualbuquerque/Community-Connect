"use client"

import styles from "./Header.module.scss"

import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"

import Button from "../Button/Button"
import Image from "next/image"
import ThemeButton from "../themeButton/ThemeButton"
import { useTheme } from "@/context/ThemeContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

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
                <h1><Link href={"/"}>Community Connect</Link></h1>
            </div>

            <div className={styles.buttons}>
                {isHome && (
                    <div>
                        <Button text="Login" type="primary" href="/auth/login" />
                        <Button text="Cadastrar" type="secondary" href="/auth/register" />
                    </div>
                )}

                <ThemeButton />
            </div>
        </section>
    )
}
