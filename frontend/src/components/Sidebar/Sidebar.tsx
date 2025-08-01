import styles from "./Sidebar.module.scss"

import dashboard_icon_light from "@/icons/sidebar/home-light.png"
import search_icon_light from "@/icons/sidebar/find-light.png"
import favorites_icon_light from "@/icons/sidebar/heart-light.png"
import services_icon_light from "@/icons/sidebar/service-light.png"
import chats_icon_light from "@/icons/sidebar/chats-light.png"

import dashboard_icon_dark from "@/icons/sidebar/home-dark.png"
import search_icon_dark from "@/icons/sidebar/find-dark.png"
import favorites_icon_dark from "@/icons/sidebar/heart-dark.png"
import services_icon_dark from "@/icons/sidebar/service-dark.png"
import chats_icon_dark from "@/icons/sidebar/chats-dark.png"

import { useTheme } from "@/context/ThemeContext"
import Image from "next/image"
import Link from "next/link"

export default function Sidebar() {
    const { theme } = useTheme()

    // Escolher os ícones com base no tema
    const icons = {
        dashboard: theme === "light" ? dashboard_icon_dark : dashboard_icon_light,
        search: theme === "light" ? search_icon_dark : search_icon_light,
        favorites: theme === "light" ? favorites_icon_dark : favorites_icon_light,
        services: theme === "light" ? services_icon_dark : services_icon_light,
        chats: theme === "light" ? chats_icon_dark : chats_icon_light,
    }

    return (
        <section className={styles.sidebar}>
            <div className={styles.menu}>
                <ul>
                    <li>
                        <Link href="/dashboard">
                            <Image src={icons.dashboard.src} alt="Dashboard" width={24} height={24} />
                            <span>Painel</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/search-service">
                            <Image src={icons.search.src} alt="Search Services" width={24} height={24} />
                            <span>Buscar serviços</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/favorites">
                            <Image src={icons.favorites.src} alt="Favorites" width={24} height={24} />
                            <span>Favoritos</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/your-services">
                            <Image src={icons.services.src} alt="Your Services" width={24} height={24} />
                            <span>Seus serviços</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/chats">
                            <Image src={icons.chats.src} alt="Chats" width={24} height={24} />
                            <span>Chats</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={styles.logout}>
                <p>Sair</p>
            </div>
        </section>
    )
}
