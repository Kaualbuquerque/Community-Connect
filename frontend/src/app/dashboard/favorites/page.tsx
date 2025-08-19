"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner";
import FavoriteFilter from "@/components/FavoriteFilter/FavoriteFilter";
import styles from "./page.module.scss";

import filter_light from "@/icons/favorite/filter_light.png";
import filter_dark from "@/icons/favorite/filter_dark.png";

export default function FavoritesPage() {
    const { theme } = useTheme();
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const filterIcon = theme === "light" ? filter_dark : filter_light;
    const toggleFilter = () => setIsFilterVisible((prev) => !prev);

    

    return (
        <main className={styles.favoritesPage} aria-label="Página de favoritos">
            <header>
                <h1>Confira seus favoritos abaixo</h1>
            </header>

            <section className={styles.inputs}>
                <Input type="text" placeholder="Pesquisar por serviço" />
                <Button
                    text=""
                    type="secondary"
                    icon={filterIcon}
                    handleFunction={toggleFilter}
                />
            </section>

            {isFilterVisible && <FavoriteFilter />}

            <section className={styles.favorites} aria-label="Lista de serviços favoritos">
                
            </section>
        </main>
    );
}
