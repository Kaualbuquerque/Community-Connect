"use client"

import styles from "./Header.module.scss"

import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"

import Button from "../Button/Button";
import Image from "next/image";
import ThemeButton from "../themeButton/ThemeButton";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
    const { theme } = useTheme();

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                {theme === "light" ?
                    <Image src={logo_dark} alt="Logo modo claro" />
                    :
                    <Image src={logo} alt="communit connect logo" />
                }
                <h1> Communit Connect </h1>
            </div>
            <div className={styles.buttons}>
                <Button text="Log In" type="primary" href="/login"/>
                <Button text="Sign Up" type="secondary" href="/register"/>
                <ThemeButton />
            </div>
        </div>
    )
}