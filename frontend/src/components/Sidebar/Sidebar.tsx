"use client";

import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

import dashboard_icon_light from "../../../public/icons/sidebar/home-light.png";
import search_icon_light from "../../../public/icons/sidebar/find-light.png";
import favorites_icon_light from "../../../public/icons/sidebar/heart-light.png";
import services_icon_light from "../../../public/icons/sidebar/service-light.png";
import chats_icon_light from "../../../public/icons/sidebar/chats-light.png";

import dashboard_icon_dark from "../../../public/icons/sidebar/home-dark.png";
import search_icon_dark from "../../../public/icons/sidebar/find-dark.png";
import favorites_icon_dark from "../../../public/icons/sidebar/heart-dark.png";
import services_icon_dark from "../../../public/icons/sidebar/service-dark.png";
import chats_icon_dark from "../../../public/icons/sidebar/chats-dark.png";
import Button from "../Button/Button";

export default function Sidebar() {
    const { theme } = useTheme();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setRole(parsedUser.role);
            }
        }
    }, []);

    const icons = {
        dashboard: theme === "light" ? dashboard_icon_dark : dashboard_icon_light,
        search: theme === "light" ? search_icon_dark : search_icon_light,
        favorites: theme === "light" ? favorites_icon_dark : favorites_icon_light,
        services: theme === "light" ? services_icon_dark : services_icon_light,
        chats: theme === "light" ? chats_icon_dark : chats_icon_light,
    };

    const menuItems = [
        { href: "/dashboard", label: "Painel", icon: icons.dashboard },
        { href: "/dashboard/search-service", label: "Buscar serviços", icon: icons.search },
        { href: "/dashboard/favorites", label: "Favoritos", icon: icons.favorites },
        ...(role === "provider"
            ? [{ href: "/dashboard/your-services", label: "Seus serviços", icon: icons.services }]
            : []),
        { href: "/dashboard/chats", label: "Chats", icon: icons.chats },
    ];

    return (
        <aside className={styles.sidebar} aria-label="Menu lateral">
            <nav className={styles.menu}>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href}>
                                <Image src={item.icon.src} alt={item.label} width={24} height={24} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.logout}>
                <Link href={"/"}><Button text="Sair" type="alert" /></Link>
            </div>
        </aside>
    );
}
