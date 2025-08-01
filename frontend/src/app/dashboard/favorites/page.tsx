"use client"

import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import styles from "./page.module.scss"
import Input from "@/components/Input/Input"
import Button from "@/components/Button/Button"
import { useTheme } from "@/context/ThemeContext"
import { useState } from "react"

import filter_light from "@/icons/favorite/filter_light.png"
import filter_dark from "@/icons/favorite/filter_dark.png"
import FavoriteFilter from "@/components/FavoriteFilter/FavoriteFilter"

const tempServices = [
    {
        id: 1,
        name: "Limpeza Residencial",
        provider: "Maria Souza",
        description: "Serviços profissionais de limpeza residencial.",
        location: "São Paulo, SP",
        date: "Hoje, 10:00",
        category: "limpeza",
        images: [],
    },
    {
        id: 2,
        name: "Jardinagem",
        provider: "Carlos Silva",
        description: "Corte de grama e manutenção de jardins.",
        location: "Rio de Janeiro, RJ",
        date: "Ontem, 14:00",
        category: "jardinagem",
        images: [],
    },
]

export default function FavoritesPage() {
    const { theme } = useTheme()
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    const filter = theme === "light" ? filter_dark : filter_light

    const toggleFilter = () => {
        setIsFilterVisible((prev) => !prev)
    }

    return (
        <section className={styles.favoritesPage}>
            <h2>Confira seus favoritos abaixo</h2>

            <div className={styles.inputs}>
                <Input type="text" placeholder="Pesquisar por serviço" />
                <Button text="" type="secondary" icon={filter} handleFunction={toggleFilter} />
            </div>

            {isFilterVisible && <FavoriteFilter />}

            <div className={styles.favorites}>
                {tempServices.map((service) => (
                    <ServiceBanner key={service.id} role="consumer" service={service} />
                ))}
            </div>
        </section>
    )
}
