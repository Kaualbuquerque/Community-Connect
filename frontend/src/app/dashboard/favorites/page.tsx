"use client";

import { useCallback, useEffect,useState } from "react";
import styles from "./page.module.scss";

import filter_light from "../../../../public/icons/favorite/filter_light.png";
import filter_dark from "../../../../public/icons/favorite/filter_dark.png";
import { useTheme } from "@/context/themeContext";
import { FiltersState, Service } from "@/utils/interfaces";
import { getFavorites } from "@/services/favorite";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Filter from "@/components/filter/filter";
import ServiceBanner from "@/components/serviceBanner/serviceBanner";

export default function FavoritesPage() {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [filters, setFilters] = useState<FiltersState>({});
    const [loading, setLoading] = useState(true);

    const filterIcon = theme === "light" ? filter_dark : filter_light;

    const toggleFilter = () => setIsFilterVisible((prev) => !prev);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getFavorites({
                search,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                state: filters.state,
                city: filters.city,
            });

            // data é um array de favoritos, então mapeie para pegar apenas os serviços
            const services = data.map((favorite: any) => favorite.service);
            setServices(services);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        } finally {
            setLoading(false);
        }
    }, [search, filters]);


    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return (
        <main className={styles.favoritesPage} aria-label="Buscar serviços">
            <header>
                <h1>Confira seus favoritos abaixo</h1>
            </header>

            <section className={styles.inputs}>
                <Input
                    type="text"
                    placeholder="Pesquisar por serviço"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    text=""
                    type="secondary"
                    icon={filterIcon}
                    handleFunction={toggleFilter}
                />
            </section>

            {isFilterVisible &&
                <Filter
                    onApplyFilter={setFilters}
                    onClose={() => setIsFilterVisible(false)}
                />}

            <section className={styles.favorites} aria-label="Lista de serviços">
                {loading && <p>Carregando serviços...</p>}

                {!loading && services.length === 0 && (
                    <p>Você não tem nenhum serviço salvo como favorito.</p>
                )}

                {!loading &&
                    services.map((service) => (
                        <ServiceBanner key={service.id} role="consumer" service={service} />
                    ))}
            </section>
        </main>
    );
}
